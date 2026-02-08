import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function run(command) {
    console.log(`> Executing: ${command}`);
    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error(`FAILED: ${command}`);
        process.exit(1);
    }
}

// 1. Run Tests
console.log('--- RUNNING TESTS ---');
run('npm test -- --run');

// 2. Prep and Bump Version
console.log('--- STAGING CHANGES ---');
run('git add .');

// Check if there are changes to commit
const status = execSync('git status --porcelain').toString().trim();
if (status) {
    console.log('--- COMMITTING CHANGES ---');
    run('git commit -m "chore: prepare for release"');
} else {
    console.log('--- NO CHANGES TO COMMIT ---');
}

console.log('--- BUMPING VERSION ---');
run('npm version patch -m "Release v%s"');

// 3. Push to Git
console.log('--- PUSHING TO REMOTE ---');
// Get current branch
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
run(`git push origin ${branch} --tags`);

console.log('--- RELEASE SUCCESSFUL ---');
