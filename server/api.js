const express = require('express');
const path = require('path');
const router =  express.Router();
const fs     =  require('fs');
// const axios = require('axios');
const API = 'localhost:4000';

let users = require(path.join(__dirname,'./fakes/users.json'));
let messagesToProcess = require(path.join(__dirname,'./fakes/messages-toprocess.json'));
let messagesProcessed = require(path.join(__dirname,'./fakes/messages-processed.json'));

const names = require(path.join(__dirname,'./fakes/names.json'));
const gifts = require(path.join(__dirname,'./fakes/gifts.json'));
const specialGifts = require(path.join(__dirname,'./fakes/gifts-special.json'));

/* GET api listing. */
router.post('/login', (req, res) => {  
  const userCred = req.body;
  if (userCred.login && userCred.password) {
      const foundUser = findUser(userCred);
      if (foundUser) {
        setUserSession(foundUser);
        res.send({
            isLoggedIn:     true,
            userId:         foundUser.id,
            authToken:      foundUser.authToken
        });  
      } else {
        res.send({
            err: {
                code: 404,
                text: 'user not found'
            }
        });  
      }    
  } else {
    res.send({
        err: {
            code: 404,
            text: 'invalid body'
        }
    })
  }  
});

router.post('/auth', (req, res) => {
    const tokenObj = req.body;
    if (tokenObj.authToken) {
        const user =  findUser(tokenObj);
        if (user) {
            const currentDate = new Date().getTime();

            if (new Date(user.sessionExpiresOn).getTime() < currentDate) {
                res.send({
                    err: {
                        code: 401,
                        text: 'Session Expired'
                    }
                });                  
            } else {
                res.send({
                    isLoggedIn: true
                });                
            }

        } else {
            res.send({
                err: {
                    code: 401,
                    text: 'Unauthorized'
                }
            });             
        }
    } else {
        res.send({
            err: {
                code: 404,
                text: 'Invalid authToken'
            }
        });        
    }

})

function findUser(iteratorObj) {    
    return users.filter((user) => {
        for (const key in iteratorObj) {
            if(user[key] !== iteratorObj[key]) {
                return false
            }
        }
        return true;
    })[0];
} 

function setUserSession(user) {
    user.authToken = new Date().getTime()+Math.random().toString(36).substr(2,9);
    //user session expires in 15 mins
    user.sessionExpiresOn = new Date(new Date().getTime()+1000000).getTime();

    try {
        fs.writeFileSync(path.join(__dirname,'./fakes/users.json'), JSON.stringify(users) , 'utf-8');
        fs.readFileSync(path.join(__dirname,'./fakes/users.json'), 'utf8', function (err, data) {
            if (err) throw err;
            users = JSON.parse(data);
        })
    } catch(err) {
        console.error(`[setUserSession]: faild to read/write data to users.json: ${err}`)
    }

    return user;
}

function resetUserSession(user) {
    user.authToken = null;
    user.sessionExpiresOn = null;

    try {
        fs.writeFileSync(path.join(__dirname,'./fakes/users.json'), JSON.stringify(users) , 'utf-8');
        fs.readFileSync(path.join(__dirname,'./fakes/users.json'), 'utf8', function (err, data) {
            if (err) throw err;
            users = JSON.parse(data);
        })
    } catch(err) {
        console.error(`[setUserSession]: faild to read/write data to users.json: ${err}`)
    }

    return user;
}

router.patch('/users/:userId/messages/:messageId/update', (req, res) => {
    console.log(req);
    let userId = req.params.userId
    let messageId = req.params.messageId

    let messageUpdate = req.body

    if(messagesToProcess[userId]) {
        patchMessageAndUpdateMsgCollections(userId, messageId, messageUpdate, res)
    } else {
        res.send({
            err : {
                code: 404,
                text: "Invalid UserId"
            }
        })
    }
})

function patchMessageAndUpdateMsgCollections(userId, messageId, messageUpdate, res) {
    let msgToFind;
    messagesToProcess[userId] = messagesToProcess[userId]
        .reduce((acc, cur)=>{                
            if (cur.messageId !== messageId) {
                acc.push(cur);
            } else {
                msgToFind = cur;
            }
            return acc;
        },[]);

    if (!msgToFind) {
        res.send({
            warn : {
                code: 101,
                text: "Invalid MessageId or message was already processed"
            }
        });     
        return;   
    }

    msgToFind.messageTextCompiled = messageUpdate.messageTextCompiled
    
    messagesProcessed[userId] = messagesProcessed[userId] || [];
    messagesProcessed[userId].push(msgToFind);

    try {

        fs.writeFileSync(path.join(__dirname,'./fakes/messages-processed.json'), JSON.stringify(messagesProcessed) , 'utf-8');
        messagesProcessed = JSON.parse(fs.readFileSync(path.join(__dirname,'./fakes/messages-processed.json'), 'utf8'));            

        fs.writeFileSync(path.join(__dirname,'./fakes/messages-toprocess.json'), JSON.stringify(messagesToProcess) , 'utf-8');
        messagesToProcess = JSON.parse(fs.readFileSync(path.join(__dirname,'./fakes/messages-toprocess.json'), 'utf8'));  
    } catch(err) {
        console.error(`[patchMessageAndUpdateMsgCollections]: failed to read/write data to message collections: ${err}`)
    }  
    //if all went fine -> sending 200
    res.send({
        code: 200
    });               
} 

/*
* Resets for everyone not just fo current user, cuz it's demo
*/
function resetMessageCollections(res) {
    try {
        messagesProcessed = JSON.parse(fs.readFileSync(path.join(__dirname,'./fakes/messages-processed_default.json'), 'utf8'));            
        fs.writeFileSync(path.join(__dirname,'./fakes/messages-processed.json'), JSON.stringify(messagesProcessed) , 'utf-8');
 
        messagesToProcess = JSON.parse(fs.readFileSync(path.join(__dirname,'./fakes/messages-toprocess_default.json'), 'utf8'));  
        fs.writeFileSync(path.join(__dirname,'./fakes/messages-toprocess.json'), JSON.stringify(messagesToProcess) , 'utf-8');
      
    } catch(err) {
        console.error(`[resetMessageCollections]: failed to read/write data to message collections: ${err}`)
    }  

    res.send({
        code: 200,
        text: "user logged out"
    });  
}

router.get('/users/:userId/messages/', (req, res) => {

    const userId = req.params.userId;
    const userMessages = messagesToProcess[userId];

    if (userMessages) {
        // sending first 4 messages of the que
        // to avoid dealing with pagination
        res.send(userMessages.slice(0,5)); 
    } else {
        res.send({
            err : {
                code: 404,
                text: "Invalid UserId"
            }
        });         
    }
})

router.get('/users/:userId/message/names/', (req, res) => {
    const userId = req.params.userId;
    const userProvisionedNames = names[userId];
    if (userProvisionedNames) {
        res.send(userProvisionedNames);     
    } else {
        res.send({
            err : {
                code: 404,
                text: "Invalid UserId"
            }
        });        
    }    
})

router.get('/users/:userId/message/gifts', (req, res) => {
    const userId = req.params.userId;
    const myGifts = gifts[userId];

    if (myGifts) {
        //I like how it sounds -> send my gifts :)
        res.send(myGifts); 
    } else {
        res.send({
            err : {
                code: 404,
                text: "Invalid UserId"
            }
        });        
    }
})

router.get('/users/:userId/message/gifts/specials', (req, res) => {
    const userId = req.params.userId
    const specialGiftsArr = specialGifts[userId];

    if (specialGiftsArr) {
        res.send(specialGiftsArr); 
    } else {
        res.send({
            err : {
                code: 404,
                text: "Invalid UserId"
            }
        });       
    }    
})

router.get('/users/:userId/messages/stats', (req, res) => {
    const userId = req.params.userId
    const userMessagesToProcess = messagesToProcess[userId];
    const userMessagesProcessed = messagesProcessed[userId];

    if (userMessagesToProcess && userMessagesProcessed) {
        res.send({            
            totallMessagesCount: userMessagesToProcess.length + userMessagesProcessed.length,
            toProcessCount:      userMessagesToProcess.length,
            processedCount:      userMessagesProcessed.length,          
        });        
    } else {
        res.send({
            err : {
                code: 404,
                text: "Invalid UserId"
            }
        });
    }
})

/*
* On demo reset toures
*/
router.post('/reset', (req, res) => {
    const userId = req.body.userId
    console.log(`user ${userId} requested reset`);
    const user = findUser({
        id: userId
    })

    if (user) {
        resetUserSession(user);
        resetMessageCollections(res);      
    } else {
        console.log(`user ${userId} does not exists`);
        res.send({
            err : {
                code: 404,
                text: "Invalid UserId"
            }
        });
    }
})

router.post('/logout', (req, res) => {    
    const userId = req.body.userId
    console.log(`user ${userId} requested logout`);

    const user = findUser({
        id: userId
    })

    if (user) {
        resetUserSession(user);
        res.send({
            code: 200,
            text: "user logged out"
        });
    } else {
        console.log(`user ${userId} does not exists`);
        res.send({
            err : {
                code: 404,
                text: "Invalid UserId"
            }
        });
    }
})

module.exports = router;