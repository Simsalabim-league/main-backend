export type AnyFunction = (...args: Array<any>) => any

export function once<F extends AnyFunction>(fn: F)
{
    let called = false
    let result: ReturnType<F>
    return ((...args: Array<any>) =>
    {
        if (!called)
        {
            called = true
            result = fn(...args)
        }
        return result
    }) as F
}
