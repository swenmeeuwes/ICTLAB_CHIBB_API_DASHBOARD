import { CHIBBDashboardPage } from './app.po';

describe('chibb-dashboard App', () => {
  let page: CHIBBDashboardPage;

  beforeEach(() => {
    page = new CHIBBDashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
