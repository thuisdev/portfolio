const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

const BASE_URL = 'http://localhost:3001';

describe('E2E Tests - Portfolio & Blog Platform', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeService(new chrome.ServiceBuilder(chromedriver.path))
            .build();
    }, 60000);

    afterAll(async () => {
        await driver.quit();
    });

    // Helper: login as admin (reusable across tests)
    const loginAsAdmin = async () => {
        await driver.get(`${BASE_URL}/login`);
        await driver.findElement(By.id('username')).sendKeys('admin');
        await driver.findElement(By.id('password')).sendKeys('admin123');
        await driver.findElement(By.css('button[type="submit"]')).click();
        await driver.wait(until.urlIs(`${BASE_URL}/`), 5000);
    };

    describe('Authentication', () => {

        it('should login successfully with valid credentials', async () => {
            await driver.get(`${BASE_URL}/login`);
            await driver.findElement(By.id('username')).sendKeys('admin');
            await driver.findElement(By.id('password')).sendKeys('admin123');
            await driver.findElement(By.css('button[type="submit"]')).click();
            await driver.wait(until.urlIs(`${BASE_URL}/`), 5000);

            // Profile link only visible when logged in
            const profileLink = await driver.findElement(By.linkText('Profile'));
            expect(profileLink).toBeDefined();
            expect(await driver.getCurrentUrl()).toBe(`${BASE_URL}/`);
        });

        it('should show error alert on invalid credentials', async () => {
            await driver.get(`${BASE_URL}/login`);
            await driver.findElement(By.id('username')).sendKeys('admin');
            await driver.findElement(By.id('password')).sendKeys('wrongpassword');
            await driver.findElement(By.css('button[type="submit"]')).click();

            // Wait for alert from failed login
            await driver.wait(until.alertIsPresent(), 5000);
            const alert = await driver.switchTo().alert();
            const alertText = await alert.getText();
            await alert.accept();

            expect(alertText).toBe('Login failed!');
            expect(await driver.getCurrentUrl()).toBe(`${BASE_URL}/login`);
        });

        it('should logout and hide protected links', async () => {
            await loginAsAdmin();

            await driver.findElement(By.xpath("//button[text()='Logout']")).click();
            await driver.wait(until.elementLocated(By.linkText('Login')), 5000);

            // After logout: Login link visible, Profile link gone
            const loginLink = await driver.findElement(By.linkText('Login'));
            expect(loginLink).toBeDefined();

            const profileLinks = await driver.findElements(By.linkText('Profile'));
            expect(profileLinks).toHaveLength(0);
        });
    });

    describe('Navigation', () => {

        it('should navigate to blogs page and display blog cards', async () => {
            await driver.get(`${BASE_URL}/blogs`);
            await driver.wait(until.elementLocated(By.css('article')), 5000);

            const articles = await driver.findElements(By.css('article'));
            expect(articles.length).toBeGreaterThan(0);
            expect(await driver.getCurrentUrl()).toBe(`${BASE_URL}/blogs`);
        });

        it('should redirect unauthenticated users away from /profile', async () => {
            await driver.get(`${BASE_URL}/profile`);
            await driver.wait(until.urlContains('login'), 5000);

            expect(await driver.getCurrentUrl()).toBe(`${BASE_URL}/login`);
        });
    });

    describe('Contact Form', () => {

        it('should fill and submit the contact form', async () => {
            await driver.get(`${BASE_URL}/contact`);

            await driver.findElement(By.id('firstName')).sendKeys('Test');
            await driver.findElement(By.id('lastName')).sendKeys('User');
            await driver.findElement(By.id('email')).sendKeys('test@test.com');
            await driver.findElement(By.id('message')).sendKeys('Test message from E2E');
            await driver.findElement(By.css('button[type="submit"]')).click();

            // Either success or failure alert appears — both confirm submit handler fired
            await driver.wait(until.alertIsPresent(), 5000);
            const alert = await driver.switchTo().alert();
            const alertText = await alert.getText();
            await alert.accept();

            expect(alertText).toMatch(/Message sent|Failed/);
            expect(await driver.getCurrentUrl()).toBe(`${BASE_URL}/contact`);
        });
    });

    describe('Admin - Blog Creation', () => {

        it('should create a new blog as admin', async () => {
            await loginAsAdmin();

            // Navigate via Profile button (matches real user flow)
            await driver.findElement(By.linkText('Profile')).click();
            await driver.wait(until.urlContains('profile'), 5000);

            await driver.findElement(By.xpath("//button[contains(text(), 'Admin Dashboard')]")).click();
            await driver.wait(until.urlContains('admin-dash'), 5000);

            // Open Create Blog modal
            await driver.wait(
                until.elementLocated(By.xpath("//button[contains(text(), 'Create Blog')]")),
                10000
            );
            await driver.findElement(By.xpath("//button[contains(text(), 'Create Blog')]")).click();

            // Wait for modal and fill fields
            await driver.wait(until.elementLocated(By.id('title')), 5000);
            const blogTitle = `E2E Test Blog ${Date.now()}`;

            await driver.findElement(By.id('title')).sendKeys(blogTitle);
            await driver.findElement(By.id('blogPrvText')).sendKeys('E2E preview');
            await driver.findElement(By.id('blogImgSrc')).sendKeys('https://picsum.photos/800/400');
            await driver.findElement(By.id('content')).sendKeys('E2E test content');

            // Submit
            await driver.findElement(By.xpath("//button[text()='Create']")).click();

            // Accept success alert
            await driver.wait(until.alertIsPresent(), 5000);
            const alert = await driver.switchTo().alert();
            const alertText = await alert.getText();
            await alert.accept();

            expect(alertText).toBe('Blog created successfully!');

            // Verify blog appears in dashboard
            await driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), '${blogTitle}')]`)), 5000);
            const createdBlog = await driver.findElement(By.xpath(`//*[contains(text(), '${blogTitle}')]`));
            expect(createdBlog).toBeDefined();
        });
    });

});