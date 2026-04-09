🧪 🧩 Enunciado estilo entrevista 

👉 (te lo dicen hablando, no tan prolijo)

“Build a Like button component.”

The button should:
######################
Toggle between liked and unliked states
Display a loading state while a request is in progress
Call an API when clicked (like / unlike)
The API has a chance to fail

Behavior requirements:
######################
When the user clicks the button:
Show a loading state immediately
Disable or handle repeated clicks appropriately
Send a request to the server

If the request succeeds:
Update the UI to reflect the new state (liked/unliked)

If the request fails:
Revert to the previous state
Show an error message

UI states to handle:
######################
Default (not liked)
Hover
Liked
Loading
Error

Follow-up questions (muy importantes):
######################
“How would you prevent multiple rapid clicks?”
“How would you improve the user experience?”
“Would you implement optimistic updates?”
“What happens if the request fails?”
“How would this scale if used in a list?”

-------------------------------------------------

🎤 Respuesta senior (como la dirías en NZ)

“I would approach this by modeling the component as a small state machine with three main states: idle, loading, and error, along with a liked flag.

On user interaction, I would trigger an async mutation. Immediately, I would transition the UI into a loading state to give feedback. Depending on the UX requirements, I could either disable further clicks or allow them and handle consistency at the request level.

For a basic implementation, I would disable interaction while the request is pending to avoid inconsistent states. Once the request resolves:

On success, I would update the liked state accordingly.
On failure, I would revert to the previous state and display an error message.

I would also ensure that error state is cleared on subsequent interactions.

From a UX perspective, if responsiveness is critical, I would consider implementing optimistic updates instead of waiting for the server response, and then handle rollback in case of failure.

Additionally, I would think about edge cases such as rapid repeated clicks, request failures, and ensuring that the UI always reflects a consistent and predictable state.

If this component were part of a larger system, like a list of items, I would likely manage the state using a centralized solution like React Query to handle caching, mutations, and synchronization with the server.”*