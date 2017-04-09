import { Injectable } from '@angular/core';

export enum PersistableStoreKeyNames {
    MessangerAppMessageNames,
    MessangerAppMessageGifts,
    MessangerAppMessageSpecialGifts,
}

export interface PersistableStoreValueModel {
  value:      any,
  expiresOn:  number //in milliseconds date when it epires
}

/*
Since ServiceWorkers as they are right now are no tailored for repsonses
and their expirations -> desided to go with localSotre approach
*/

@Injectable()
export class RemoteValuesStoreService {

  persistableStoreValuesExpiaryTimeFramesDic = {
    [PersistableStoreKeyNames.MessangerAppMessageNames]: null,
    [PersistableStoreKeyNames.MessangerAppMessageGifts]: 5.256e+9, //two monts
    [PersistableStoreKeyNames.MessangerAppMessageSpecialGifts]: 5.256e+9 //two monts
  }

  constructor() {}

  setValueByStoreKey(key: PersistableStoreKeyNames, responseValue: any) {
    try {
      const valueExpirateionTimeFrame = this.persistableStoreValuesExpiaryTimeFramesDic[key]
      const storeValue: PersistableStoreValueModel = {
        value: responseValue,
        expiresOn: valueExpirateionTimeFrame ? new Date().getTime() + valueExpirateionTimeFrame : null
      }
      localStorage.setItem(PersistableStoreKeyNames[key], JSON.stringify(storeValue));
    } catch(err) {
      console.error(err);
      return false;
    }
  }

  getValueByStoreKey(key: PersistableStoreKeyNames) {
    try {
      let storeValue: PersistableStoreValueModel = JSON.parse(localStorage.getItem(PersistableStoreKeyNames[key]));
      const currentTime = new Date().getTime();
      if (storeValue) {
        if (!storeValue.expiresOn) {
          //expiry time is inifinite by schema
          return storeValue;
        } else {
          return currentTime > storeValue.expiresOn ? null : storeValue;
        }
      } else {
        return null;
      }
    } catch(err) {
      console.error(err);
      return false;
    }
  }

  resetStore() {
    for(const key in PersistableStoreKeyNames) {
      const localStoreStrKey = PersistableStoreKeyNames[PersistableStoreKeyNames[key]]
      if (localStorage.getItem(localStoreStrKey) !== null) {
        localStorage.removeItem(localStoreStrKey);
      }      
    }
  }
}
