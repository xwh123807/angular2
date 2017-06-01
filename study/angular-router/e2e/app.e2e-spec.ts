import { AngularRouterPage } from './app.po';

describe('angular-router App', () => {
  let page: AngularRouterPage;

  beforeEach(() => {
    page = new AngularRouterPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
