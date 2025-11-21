describe('OnBoardingScreen', () => {
  beforeAll(async () => {
    await device.launchApp();
    await waitFor(element(by.id('onboard-swiper')))
      .toBeVisible()
      .withTimeout(2000);
  });

  test('should show first and second slide in onboarding', async () => {
    await expect(
      element(by.text('Grab all events now only in your hands')),
    ).toBeVisible();

    // await element(by.id('onboard-swiper')).takeScreenshot();

    await element(by.text('Next')).atIndex(0).tap();

    await expect(
      element(by.text('Easy payment & fast event ticket')),
    ).toBeVisible();

    await element(by.text('Next')).atIndex(1).tap();

    await expect(
      element(by.text("Let's go to your favourite event now")),
    ).toBeVisible();
  });

  test('should navigate to login', async () => {
    // await element(by.id('onboard-swiper')).takeScreenshot();

    await expect(element(by.text('Login'))).toBeVisible();
    await element(by.text('Login')).tap();

    await expect(element(by.id('Login'))).toBeVisible();
  });
});
