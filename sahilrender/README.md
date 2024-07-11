# TradeTrust Decentralized Renderer (React Template)

This template serves as a quick way to start building your own decentralized renderer using TradeTrust stack. You can follow our tutorial over at (https://docs.tradetrust.io/docs/tutorial/decentralised-renderer/).

## How and what?

This repository boilerplate code is spinned up from [Create React App](https://github.com/facebook/create-react-app).

The decentralized renderer code here is based off OpenAttestation's [decentralized-renderer-react-template](https://github.com/Open-Attestation/decentralized-renderer-react-template), but with **some changes** as mentioned below.

## Notable changes

To stay as simple and less opinionated as possible, these are omitted:

- Testing frameworks.
- CI pipelines.

> You are expected to setup your own tests, styling according to your needs.

## Main dependancies

- `@govtechsg/decentralized-renderer-react-components`
- `@tradetrust-tt/tradetrust`
- `react`
- `react-dom`

---

### Prerequisite

- Node (optionally, use [nvm](https://github.com/nvm-sh/nvm) to manage node version)
- Node version 18 onwards.

## Install

The easiest way to use **tradetrust-decentralized-renderer-template** is through github by clicking on `Use this template` button in the repository page.

You can also download or `git clone` this repo

```sh
git clone https://github.com/TradeTrust/tradetrust-decentralized-renderer.git
cd tradetrust-decentralized-renderer
rm -rf .git
npm install
```

Make sure to edit the following files according to your module's info:

- package.json (module name and version)
- README.md
- LICENSE
- add your own template (in `src/templates` folder) and configure correctly the template registry (in `src/templates/index.tsx` file)

### Development

```sh
npm run storybook
```

Head off to `http://localhost:6006/` to see storybook.

### Core Components

Core components, located in the `src/core directory`, are reusable React components that offer enhanced functionalities for renderer templates. When you run `npm run storybook`, the example templates with core components will be displayed.

This repository contains a collection of example templates along with demonstrations of how to use core components. You can find these examples in the `/src/templates` directory. These templates serve as references and guides to help you set up your own templates to meet your unique requirements.

#### DocumentQrCode

It allows users to share documents across devices using a QR code.

For detailed information on how to use the QR Code Component, please refer to the official documentation [here](https://docs.tradetrust.io/docs/reference/tradetrust-website/qr-code/).

#### Wrapper/ ErrorBoundary

The Wrapper/ErrorBoundary Component is designed to handle scenarios where a template cannot be rendered correctly. In such cases, this component acts as a fallback, displaying a user-friendly error message and stack.

#### SelectiveRedaction

The SelectiveRedaction Component is a powerful tool for safeguarding sensitive information within a document. To use the SelectiveRedaction in the decentralized renderer, follow these steps

- Click the "Edit Document" button within the SelectiveRedaction component.
- Click "Remove" on the redactable values to specify the information you want to remove.
- Click "Done" on the Component to complete the process.
- Download the document with hidden values

#### PrintWatermark

The PrintWatermark Component allows users to include the TradeTrust watermark text in the background of a document's print preview.

### Creating new templates

1. Create your new sample documents json in `src/templates/<YOUR_SAMPLE>/<YOUR_DOCUMENT>.json`. Be sure they conform to either OpenAttestation [v2](https://schema.openattestation.com/2.0/schema.json) or [v3](https://schema.openattestation.com/3.0/schema.json) schema.

2. Develop whatever you need using storybook, passing in your sample documents json.

3. When done, remember to register the new template to `registry` in `src/templates/index.tsx`.

> You can follow the template samples provided under `src/templates` folder.

### Build and host

```sh
npm run build
```

Host your `dist` folder in your favourite hosting provider. One example could be [netlify](https://www.netlify.com/).
