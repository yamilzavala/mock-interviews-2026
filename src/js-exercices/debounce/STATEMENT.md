🚀 Seguimos

Ahora pasamos a:

🧪 PARTE 2 — Algoritmo 

Nada académico raro.

🧩 Enunciado

👉 Debounce Function

Implementar una función:

debounce(fn, delay)
🎯 Comportamiento
si se llama muchas veces seguidas
👉 solo ejecuta la última
Ejemplo
const debounced = debounce(fn, 300);

debounced();
debounced();
debounced();

👉 solo se ejecuta una vez después de 300ms

🎤 Pregunta

👉 explicame:

cómo lo implementarías
qué pasa con múltiples calls
cómo manejarías this y argumentos
⚠️ FOLLOW-UP

“Can you add cancel and flush methods?”

----------------------------------

🧩 Te guío sin darte la solución completa

Armá esto:

function debounce(fn, delay) {
  let timeout;

  return function () {
    // 1. cancelar timeout anterior

    // 2. crear nuevo timeout

    // 3. ejecutar fn después del delay
  };
}

-----------------------------------

🧠 Senior Explanation (Interview-ready)

"This is a debounce utility that delays the execution of a function until a specified delay has passed without new calls."

🔹 Core idea

"I use a closure to persist state across multiple invocations, specifically the timeout id, the last arguments, and the last execution context."

🔹 Step-by-step explanation
1. Closure & state
let timeout;
let lastArgs;
let lastContext;

"These variables live inside the closure, allowing the debounced function to keep track of the pending execution, as well as the latest arguments and context."

2. Main debounced function
function debouncedFn(...args) {
    lastArgs = args;
    lastContext = this;

"On every call, I store the latest arguments and the current execution context (this). This ensures that only the most recent invocation is used when the function eventually runs."

3. Cancel previous execution
if(timeout) {
    clearTimeout(timeout)
}

"If there's already a scheduled execution, I cancel it. This is what ensures that only the last call is executed."

4. Schedule new execution
timeout = setTimeout(() => {
    fn.apply(lastContext, lastArgs)
    timeout = null;
}, delay)

"I schedule a new execution using setTimeout.
When it runs, I invoke the original function using apply to preserve both the correct this context and the latest arguments.
After execution, I reset the timeout to null to indicate there's no pending work."

🔹 cancel method
debouncedFn.cancel = () => {
    if(timeout) {
        clearTimeout(timeout)
        timeout = null;
    }
}

"The cancel method allows us to discard any pending execution, which can be useful in cases like component unmounting or request cancellation."

🔹 flush method
debouncedFn.flush = () => {
    if(timeout) {
        clearTimeout(timeout)
        fn.apply(lastContext, lastArgs)
        timeout = null;
    }
}

"The flush method immediately executes the pending function if there is one, instead of waiting for the delay.
This is useful when we want to force execution, for example before submitting a form."

🔹 Why apply?

"I use apply to ensure that the function is executed with the correct context and arguments. This makes the debounced function behave transparently like the original one."

🔹 Final summary (short version)

"This implementation uses closures to maintain state across calls, cancels previous executions on each invocation, and ensures that only the last call is executed after the delay.
It also provides cancel and flush methods for better control over pending executions."


---------------------------------------------------------------------------------------

💯 Versión ideal (nivel top candidate)

I would implement debounce using a closure to store a timeout reference, along with the latest arguments and context.

Each time the debounced function is called, I clear the existing timeout and store the latest arguments and context.

Then I schedule a new execution using setTimeout. When it runs, I call the original function using apply to preserve the correct context and arguments.

For cancel, I clear the timeout and reset it.

For flush, I immediately execute the pending function if there is one.

This ensures only the latest call is executed after the delay.