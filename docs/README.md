# @labrynx/error-enhanced

## Introduction

Welcome to the official documentation for the `error-enhanced` library. This comprehensive guide is intended to serve as the central resource for developers looking to implement or understand the library's capabilities for advanced error management. Whether you're a novice trying to get started or an experienced developer looking for in-depth information, this documentation has you covered.

## What is `error-enhanced`?

![Architectural Diagram](https://github.com/labrynx/error-enhanced/assets/26366705/24acd5f3-adfb-4d8e-baaf-0f05409085ca)

Meet `error-enhanced`, a game-changing TypeScript library designed to make error handling in web apps a whole lot smarter and easier. Forget the limitations of the traditional JavaScript `Error` object. With `error-enhanced`, you get a single, feature-packed error object that provides a lot more details about what went wrong.

### Challenges We're Tackling

**No More Patchwork Error Handling**
Normally, managing errors can make your code look like a patchwork quilt — confusing and messy. `error-enhanced` eliminates that by organizing all error information neatly into a single object. The result? Code that’s easier to read, debug, and maintain.

**Better Error Context**
Ever got frustrated because a JavaScript error didn't give you enough information to actually fix the problem? `error-enhanced` solves this by providing tons of extra details right in the error object itself. Now you can diagnose and fix issues much faster.

**Catch Errors Before They Catch You**
JavaScript's flexibility is great but can be a double-edged sword, leading to errors that only appear when it's too late. `error-enhanced` is built on TypeScript, giving you the advantage of catching type-related errors during development. This means fewer bugs and crashes when your app is live.

By addressing these challenges, `error-enhanced` aims to make your life as a developer easier and your apps more robust and user-friendly.

## Why Choose `error-enhanced`?

**Simplified Error Handling**
With `error-enhanced`, you no longer have to juggle multiple, scattered error properties. Everything gets bundled into one easy-to-understand object. This makes finding and fixing errors a breeze and makes your code easier to read and maintain.

**Flexible and Customizable**
Need error-handling features that don't come out-of-the-box? No problem. `error-enhanced` comes with "enhancers" that you can use to add more data and functionalities to your error objects. For example, you can add HTTP status codes or user-specific information. And if that's not enough, you can also create your own custom enhancers to tailor the library to your project's specific needs.

**Stronger Safety with TypeScript**
Type safety is crucial for avoiding surprise errors when your application is up and running. Since `error-enhanced` is built on TypeScript, you get the advantage of checking data types during development, thus minimizing runtime errors.

**Detailed Metadata for Enhanced Debugging**
Ever wished you could know more about an error that popped up in your logs? With `error-enhanced`, you can add a ton of extra information to each error object. This makes your error logs much more useful and helps you troubleshoot issues more quickly.

## Core Features

**Unification of Error Objects**
The library introduces a unified error object that serves as a single point of reference for all error-related information. This feature is particularly useful for large codebases and microservices architectures where error handling can become convoluted.

**Use of Enhancers for Dynamic Error Enrichment**
Enhancers are modular components that attach additional metadata to the base error object. These can range from HTTP information to user activity data, providing a fuller context for each error instance.

**Enum-based Error Categorization**
The library offers predefined enums for consistent error categorization. These enums standardize the way errors are classified across different parts of an application, simplifying error handling routines.

**Strongly Typed Interfaces**
`error-enhanced` leverages TypeScript to offer strongly-typed interfaces for the unified error object. These interfaces define the shape of the enhanced error, offering better compile-time checks and improved developer experience through IntelliSense support in IDEs.

## Quick Start Guide

If you're eager to integrate `error-enhanced` into your project, the [Installation Guide](https://github.com/labrynx/error-enhanced/wiki/Getting-Started:-Installation) will provide you with all the steps to get started.

## Additional Resources

For further exploration, visit the dedicated pages for each core component:

* [Enhancers](https://github.com/labrynx/error-enhanced/wiki/Core-Concepts:-Enhancers)
* [Utilities](https://github.com/labrynx/error-enhanced/wiki/Core-Concepts:-Utilities)
* [Enums](https://github.com/labrynx/error-enhanced/wiki/Core-Concepts:-Enums)
* [Interfaces](https://github.com/labrynx/error-enhanced/wiki/Core-Concepts:-Interfaces)
