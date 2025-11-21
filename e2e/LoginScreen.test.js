describe('OnBoardingScreen', () => {
  beforeAll(async () => {
    await device.launchApp();
    await waitFor(element(by.id('onboard-swiper')))
      .toBeVisible()
      .withTimeout(2000);

    await element(by.text('Next')).atIndex(0).tap();
    await element(by.text('Next')).atIndex(1).tap();
    await element(by.text('Login')).tap();
  });

  test('should fill up credential', async () => {
    await expect(element(by.id('Login'))).toBeVisible();

    await element(by.id('email')).typeText('Naruto@Konoha.hv');
    await element(by.id('password')).typeText('1BowlRamen');
    await element(by.id('password')).tapReturnKey();

    await element(by.id('Login')).tap();
    await expect(element(by.text('Testing Complete'))).toBeVisible();
  });
});
