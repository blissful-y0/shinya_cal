const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

console.log('Electron 메인 프로세스 빌드 중...')

// TypeScript 컴파일
execSync('npx tsc -p tsconfig.main.json', { stdio: 'inherit' })

console.log('Electron 메인 프로세스 빌드 완료!')