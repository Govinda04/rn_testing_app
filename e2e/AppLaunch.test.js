// const { device } = require('detox');

import { device, element, by } from 'detox';

describe('App Launch', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show Splashscreen', async () => {
    const splashScrImg = element(by.id('logo-image'));

    await expect(splashScrImg).toBeVisible();
  });

  it('should redirect to Onboarding after launch', async () => {
    await waitFor(element(by.id('onboard-swiper')))
      .toBeVisible()
      .withTimeout(2000);

    await expect(element(by.id('onboard-swiper'))).toBeVisible();
  });
});
