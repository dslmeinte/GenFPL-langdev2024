# README

This repository contains the code for the presentation “GenFPL: DSL-embeddable functional programming languages” that I gave during the [LangDev 2024 conference](https://langdevcon.org/).
It also contains the [**slides for this presentation**](./presentation.pdf).

[GenFPL repository](https://github.com/dslmeinte/GenFPL/)


## Abstract

Many DSLs end up having expressions, ranging from relatively simple logic and/or arithmetic, to more intricate, query-like collection and object traversals.
More often than not, such a “funclarative” expression sublanguage is built from scratch — which is fun but also costly.

[GenFPL](https://github.com/dslmeinte/GenFPL) is a new tool to generate a ready-to-run Functional Programming-style Language (**FPL**) to easily embed in existing DSLs — provided they can be defined using [LionWeb](https://lionweb.io/).
It's inspired by [KernelF](https://markusvoelter.medium.com/design-evolution-and-use-of-kernelf-b6c76993757d) for JetBrains MPS, while aiming to be portable and as technology-independent as possible.
It does so by generating a coherent family of extensible languages from a simple configuration.

In this talk, I'll demonstrate how GenFPL is used to implement a FPL and integrate it in an existing DSL.
I'll also touch on implementing and running an interpreter in TypeScript, defining a concrete syntax using [Freon](https://www.freon4dsl.dev/), integrating on the type (system)-level, and introducing a standard library.
Finally, I'll discuss some design trade-offs around (not) providing functional abstractions.

