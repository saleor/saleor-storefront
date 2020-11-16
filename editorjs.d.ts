/* eslint-disable */

declare module "@editorjs/header"; {
    import { ToolConstructable } from "@editorjs/core";
    import * as HeaderPlugin from '@editorjs/header'

    export class Header extends ToolConstructable {}
}

declare module "@editorjs/list"; {
    import { ToolConstructable } from "@editorjs/core";
    import * as ListPlugin from '@editorjs/list'

    export class List extends ToolConstructable {}
}

declare module "@editorjs/quote"; {
    import { ToolConstructable } from "@editorjs/core";
    import * as QuotePlugin from '@editorjs/quote'

    export class Quote extends ToolConstructable {}
}

