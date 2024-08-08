import { BASE_URL } from './src/env.config,ts';
import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';

export const STORAGE_STATE = path.join(__dirname, 'tmp/session.json');

export default defineConfig({
    testDir: './tests',
    timeout: 30_000,
    expect: { timeout: 10_000 },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    globalSetup: 'src/global-setup.ts',
    use: {
        baseURL: BASE_URL,
        actionTimeout: 0,
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            grepInvert: /@logged/,
            use: {
                ...devices['Desktop Chrome'],
            },
        },
        {
            name: 'setup',
            testMatch: '**.setup.ts',
        },
        {
            name: 'logged',
            grep: /@logged/,
            dependencies: ['setup'],
            use: {
                storageState: STORAGE_STATE,
            },
        },
    ],
});
