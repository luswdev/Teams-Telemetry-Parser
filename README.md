# Teams Telemetry Parser
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/luswdev/teams-telemetry-parser/macos.yml?label=macOS&logo=apple&logoColor=fff&style=for-the-badge)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/luswdev/teams-telemetry-parser/windows.yml?label=Windows&logo=windows11&logoColor=fff&style=for-the-badge)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/luswdev/teams-telemetry-parser/ubuntu.yml?label=Ubuntu&logo=ubuntu&logoColor=fff&style=for-the-badge)\
![GitHub package.json version](https://img.shields.io/github/package-json/v/luswdev/teams-telemetry-parser?style=for-the-badge)
![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/luswdev/teams-telemetry-parser?sort=semver&style=for-the-badge)
![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/luswdev/teams-telemetry-parser/dev/electron?logo=electron&logoColor=fff&style=for-the-badge)\
![GitHub](https://img.shields.io/github/license/luswdev/teams-telemetry-parser?style=for-the-badge)

Parsing Team telemetry log to readable content.

# Installation

| Platform | Architecture | Download Link |
| - | - | - |
| Windows | x86 | |
| Windows | x64 | |
| Windows | ARM64 | |
| MacOS | Intel (x64) | |
| MacOS | Apple Silicon (ARM64) | |
| MacOS | Universal | |

# Build Guide

- Clone and install node module first

```bash
git clone 
cd
npm install
```

- Use electron-forge to build release
- Default will build your local machine platform and architecture

```bash
npm run make
```

- If you want to build specific platform or architecture, passing argument `--platform` / `--arch` by `--`
- Ex:

```bash
npm run make -- --platform=darwin
npm run make -- --arch=x64
npm run make -- --platform=windows --arch=arm64
```

## Platform List

| Argument | Platform |
| -------- | -------- |
| `win32`  | Windows  |
| `darwin` | MacOS    |
| `linux`  | Linux    |

## Architecture List

| Argument    | Architecture  |
| ----------- | ------------- |
| `ia32`      | x86           |
| `x84`       | x64           |
| `x84`       | Intel         |
| `arm64`     | ARM64         |
| `arm64`     | Apple Silicon |
| `universal` | Universal App |

## Debug

- Start debug session

```bash
npm start
```

# Dependence
- electron
- electron-forge
- vue
- bootstrap
