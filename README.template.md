# __NAME__

__DESCRIPTION__

## Table of Contents

- [__NAME__](#name)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Build Process](#build-process)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)
  - [Project Information](#project-information)
  - [Keywords](#keywords)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Operating System**: The project is developed and tested on macOS and Ubuntu. It should also work on Windows.
- **Node.js**: You need to have Node.js installed. This project requires Node.js version 14.18.0 or later. You can download Node.js from [here](https://nodejs.org/).
- **Package Manager**: npm (comes with Node.js) or yarn. This project includes a `bun.lockb` file, indicating it might use Bun, a fast JavaScript runtime. Ensure you have it installed from [here](https://bun.sh/).

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Qit-tools/browser-extension-password-generator-pro.git
   cd browser-extension-password-generator-pro
   ```

2. **Install dependencies**:

   Using npm:

   ```bash
   npm install
   ```

   Using yarn:

   ```bash
   yarn install
   ```

   Using Bun:

   ```bash
   bun install
   ```

## Build Process

To build the project and generate the extension files, follow these steps:

1. **Build the project**:

   Using npm:

   ```bash
   npm run build
   ```

   Using yarn:

   ```bash
   yarn build
   ```

   Using Bun:

   ```bash
   bun run build
   ```

2. The built files will be in the `dist` directory.

## Usage

After building the project, you can load the extension in your browser:

1. Open your browser and navigate to the extensions page (e.g., `chrome://extensions` for Chrome).
2. Enable "Developer mode".
3. Click "Load unpacked" and select the `dist` directory.

## Contributing

To contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Project Information

- **Name**: browser-extension-password-generator-pro
- **Version**: __VERSION__
- **Author**: [Qit.tools](https://qit.tools/)
- **Description**: Powerful and user-friendly browser extension/add-on with PRO features for randomly generating and checking passwords security.
- **Homepage**: [https://qit.tools/](https://qit.tools/)
- **Repository**: [https://github.com/Qit-tools/browser-extension-password-generator-pro.git](https://github.com/Qit-tools/browser-extension-password-generator-pro.git)
- **Funding**: [Buy me a coffee](https://buymeacoffee.com/deyurii)

## Keywords

- password
- security
- generator
- extension
- add-on
- firefox
- edge
- brave
- opera
- chrome
- pro
- protection
- random
