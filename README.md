![Shy Sloth](https://raw.githubusercontent.com/50BytesOfJohn/shy-sloth/main/assets/baner.png)
![Minified size](https://img.shields.io/bundlephobia/min/shy-sloth?style=for-the-badge)
![npm](https://img.shields.io/npm/dm/shy-sloth?style=for-the-badge)
![NPM](https://img.shields.io/npm/l/shy-sloth?style=for-the-badge)
![Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/50BytesOfJohn/83096d5101dbcd1a01f6e3b65c33a2ce/raw/a800f471732e8ee64da8b6a770157189c181b1f3/shy-sloth-coverage.json)

# Shy Sloth

This README and library is still in early development stage. Please be aware that some breaking changes can be introduced in future versions. Thank YOU!

TODO: Description

## Table of contents

1. Inspiration
1. [Install](#install)
1. Functions
    1. [withDefault](#with-default)

## Inspiration

TODO: Inspiration

## Install

1. npm

    ```bash
    npm install shy-sloth
    ```
1. yarn
    ```bash
    yarn add shy-sloth
    ```
1. pnpm
    ```bash
    pnpm add shy-sloth
    ```

## Functions

TODO: List of functions

### withDefault

When promise resolved to `undefined`, then default value will be used. Remember that default value is actually function that returns default value.

TODO: Describe the reason of using function

Examples:

```typescript
const promise = async () => undefined

const foo = withDefault(
  promise,
  () => 'DEFAULT_VALUE'
)

await foo() // 'DEFAULT_VALUE'
```

You can pass arguments to promise like this:

```typescript
const promise = async (name) => name ? `Hello ${name}` : undefined

const foo = withDefault(
  promise,
  () => "What's your name?"
)

await foo('John') // 'Hello John'
await foo(null) // "What's your name?"
```

### withMappedResult

When promise resolves, the resolved value is used as a key, to get property from provided object.

Examples:

```typescript
const statusToText = {
  200: 'OK',
  404: 'Not Found'
}

const promise = async (url) => {
  return fetch(url).then(r => r.status)
}

const getTextFromStatus = withMappedResult(
  promise,
  statusToText
)

await getTextFromStatus('https://...') // 'OK'
```

You can always make use of withDefault and withMappedResult to provide information even when status was not mapped:

```typescript
const statusToText = {
  200: 'OK',
  404: 'Not Found'
}

const promise = async (url) => {
  return fetch(url).then(r => r.status)
}

const getTextFromStatus = withDefault(
  withMappedResult(promise, statusToText),
  () => "???"
);

// Status: 200
await getTextFromStatus('https://...') // 'OK'

// Status: 201
await getTextFromStatus('https://...') // '???'
```

Why no built in default value in withMappedResult? Shy-sloth target is to provide as simple as possible functions, that can work well together. You can see how easy was to add withDefault. There were even no changes needed in code. I've just added withDefault on top of withMappedResult.

Let's be honest. If you don't like this approach, the shy sloth, is totally fine with that. He's sleeping anyways. 🦥

## License

[MIT](https://opensource.org/licenses/MIT)