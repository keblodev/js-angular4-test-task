import { MessageProcessorPage } from './app.po';

describe('message-processor App', () => {
  let page: MessageProcessorPage;

  beforeEach(() => {
    page = new MessageProcessorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
