import * as zod from "zod"

function nitroMiddlewareEmpiler(middlewares: Function[]) {
    return async () => {
        for (const m of middlewares) {
            console.log(m)
        }
    }
}

export class MiddlewareStack {
    protected _middlewares: Function[] = []

    middleware(middlewareFn) {
        const newMiddlewareStack = new MiddlewareStack()
        newMiddlewareStack._middlewares.push(...this._middlewares, middlewareFn)
        return newMiddlewareStack
    }

    handle(event) {
        let index = 0
        const runMiddleware = () => {
            if (index >= this._middlewares.length) {
                return
            }
            const middleware = this._middlewares[index++]
            middleware(event, runMiddleware)
        }
        runMiddleware()
    }
}
