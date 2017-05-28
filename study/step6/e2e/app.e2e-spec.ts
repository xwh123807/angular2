import { Step6Page } from './app.po';

describe('step6 App', () => {
  let page: Step6Page;

  beforeEach(() => {
    page = new Step6Page();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
