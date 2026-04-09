import { useState } from "react";
import { longestSubstring } from "../../algorithms-exercises/slidingWindow/longestSubStrWithoutRepetition/longestSubstring";
import { maximunSumSubArr } from "../../algorithms-exercises/slidingWindow/maxmunSumSubArr/maximumSumSubArray";
import { shorterSubArrWithTarget } from "../../algorithms-exercises/slidingWindow/shorterSubArrWithTarget/shorterSubArrWithTarget";
import { maxSubarrayAverage } from "../../algorithms-exercises/slidingWindow/maxAvgSubArr/maxSubarrayAverage";
import { twoSumWithTarget } from "../../algorithms-exercises/two-pointers/twoSumWithTarget/twoSumWithTarget";
import { longestSubStrWithK } from "../../algorithms-exercises/slidingWindow/longestSubStrWithK/longestSubStrWithK";
import { productLessMe } from "../../algorithms-exercises/prefix-sufix/productLessMe/productLessMe";
import { power_set } from "../../algorithms-exercises/backtracking_power_set/power_set/backtracking_power_set";
import { anagramsGroup, anagramsGroupSort } from "../../algorithms-exercises/categorization/anagramsGroup /anagramsGroup";


export default function ExerciseRunner() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const handleRun = () => {
    console.log(input)
    // const res = longestSubstring(input);
    // const res = maximunSumSubArr(JSON.parse(input), 3); // input "[2, 1, 5, 1, 3, 2]""
    // const res = shorterSubArrWithTarget(7, JSON.parse(input),);
    // const res = maxSubarrayAverage(JSON.parse(input), 4);
    // const res = twoSumWithTarget(JSON.parse(input), 8);
    // const res = longestSubStrWithK(input, 2);
    // const res = productLessMe(JSON.parse(input));
    // const res = power_set(JSON.parse(input));
    // const res = anagramsGroup(JSON.parse(input));
    const res = anagramsGroupSort(JSON.parse(input));
    console.log(res)
    setResult(res);
  };

  return (
    <div>
      <h2>JS Exercices</h2>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter string..."
      />

      <button onClick={handleRun}>Run</button>

      {result !== null && <p>Result: {result} </p>}
      {/* {result !== null && <p>Result: [ {result[0]} , {result[1]} ]</p>} */}
    </div>
  );
}