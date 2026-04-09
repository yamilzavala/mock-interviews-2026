export function debounce(fn, delay = 300) {
    let timeout;
    let lastArgs;
    let lastContext;

    function debouncedFn(...args) {
        lastArgs = args;
        lastContext = this;

        if(timeout) {
            clearTimeout(timeout)
        }

        timeout = setTimeout(() => {
            fn.apply(lastContext, lastArgs)
            timeout = null;
        }, delay)
    }

    debouncedFn.cancel = () => {
        if(timeout) {
            clearTimeout(timeout)
            timeout = null;
        }
    }

    debouncedFn.flush = () => {
        if(timeout) {
            clearTimeout(timeout)
            fn.apply(lastContext, lastArgs)
            timeout = null;
        }
    }

    return debouncedFn
}