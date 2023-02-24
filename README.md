# Teams Telemetry Parser
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/luswdev/teams-telemetry-parser/macos.yml?label=macOS&logo=apple&logoColor=fff)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/luswdev/teams-telemetry-parser/windows.yml?label=Windows&logo=windows11&logoColor=fff)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/luswdev/teams-telemetry-parser/ubuntu.yml?label=Ubuntu&logo=ubuntu&logoColor=fff)
![GitHub package.json version](https://img.shields.io/github/package-json/v/luswdev/teams-telemetry-parser)
![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/luswdev/teams-telemetry-parser?sort=semver)
![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/luswdev/teams-telemetry-parser/dev/electron?logo=electron&logoColor=fff)
![GitHub](https://img.shields.io/github/license/luswdev/teams-telemetry-parser)

Parsing Team telemetry log to readable content.

# Installation

Checkout [latest release page](https://github.com/luswdev/teams-telemetry-parser/releases/latest) to download file.

| Platform | Architecture          | File Name                                      |
| -------- | --------------------- | ---------------------------------------------- |
| Windows  | x86                   | teams-telemetry-parser-{version}-ia32.exe      |
| Windows  | x64                   | teams-telemetry-parser-{version}-x64.exe       |
| Windows  | ARM64                 | teams-telemetry-parser-{version}-arm64.exe     |
| MacOS    | Intel (x64)           | Teams.Telemetry.Parser-{version}-x64.dmg       |
| MacOS    | Apple Silicon (ARM64) | Teams.Telemetry.Parser-{version}-arm64.dmg     |
| MacOS    | Universal             | Teams.Telemetry.Parser-{version}-universal.dmg |
| Linux    | x64                   | teams-telemetry-parser_{version}_amd64.deb     |
| Linux    | ARM64                 | teams-telemetry-parser_{version}_arm64.deb     |
| Linux    | ARMv7l                | teams-telemetry-parser_{version}_armhf.deb     |

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
