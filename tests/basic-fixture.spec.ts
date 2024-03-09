import test, { expect } from "@playwright/test";

const myTest = test.extend({
    webApp: async ({ page }, use) => {
        await page.goto('https://parabank.parasoft.com/parabank/index.htm');
        await test.step('Logging in', async () => {
            await page.locator("//input[@name='username']").fill('testUsername');
            await page.locator("//input[@name='password']").fill('testPassword');
            await page.locator("//input[@type='submit']").click();
        })
        await use(page)
    }
})

myTest('1 - validating navbar', async ({ webApp }) => {
    const navbarLinkNames: string[] = ["About Us", "Services", "Products", "Locations", "Admin Page"]

    for (let i = 0; i < navbarLinkNames.length; i++) {
        const name = navbarLinkNames[i];
        await expect.soft(await webApp.locator("//*[@class='leftmenu']//li//a").nth(i).textContent()).toEqual(name);
        console.log(await webApp.locator("//*[@class='leftmenu']//li//a").nth(i).textContent());
    }
})

myTest('2 - navigating to about us', async ({ webApp }) => {
    await webApp.locator("//*[@class='leftmenu']//li//a").nth(0).click();
    await expect.soft(webApp.url()).toContain("about");
})

myTest('2 - navigating to services', async ({ webApp }) => {
    await webApp.locator("//*[@class='leftmenu']//li//a").nth(1).click();
    await expect.soft(webApp.url()).toContain("services");
})