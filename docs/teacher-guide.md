# RecursiQuest — Teacher Guide

> **What is it?**
> RecursiQuest is an interactive, step-by-step algorithm visualizer designed to help students *see* and *understand* how recursion and sorting algorithms work — one step at a time, with animated visuals, plain-language explanations, and a built-in quiz.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Getting Around — The Two Screens](#2-getting-around----the-two-screens)
3. [Algorithm Categories](#3-algorithm-categories)
   - [Recursion](#recursion)
   - [Sorting](#sorting)
   - [My Functions](#my-functions)
4. [The Visualization Panels](#4-the-visualization-panels)
   - [Call Stack](#call-stack-panel)
   - [Recursion Tree](#recursion-tree-panel)
   - [Code Snippet](#code-snippet-panel)
   - [Call Explanation (Narration)](#call-explanation--narration-panel)
   - [Array Visualizer](#array-visualizer-sorting-only)
   - [Algorithm Insight](#algorithm-insight-panel)
5. [Playback Controls](#5-playback-controls)
6. [Learn Mode vs Quiz Mode](#6-learn-mode-vs-quiz-mode)
7. [Achievements & Levels](#7-achievements--levels)
8. [Adding Your Own Function](#8-adding-your-own-function)
9. [Import & Export Functions](#9-import--export-functions)
10. [Language Support](#10-language-support)
11. [Screenshot Feature](#11-screenshot-feature)
12. [Sharing a Specific Step](#12-sharing-a-specific-step)
13. [Keyboard Shortcuts](#13-keyboard-shortcuts)
14. [Quick-Start Checklist for Teachers](#14-quick-start-checklist-for-teachers)

---

## 1. Overview

RecursiQuest turns an abstract concept — "the function calls itself!" — into something students can actually see. When a student runs an algorithm, the app records every single function call and return, then lets them walk through it at any speed using animated panels.

**Who it is for:** students learning recursion and sorting for the first time, typically in an introductory programming or data structures course.

**Language used in code examples:** C# — clean, readable, familiar to students learning object-oriented programming.

---

## 2. Getting Around — The Two Screens

### Home Screen
This is where students start. It shows three tabs: **Recursion**, **Sorting**, and **My Functions**.

- Each tab lists available algorithms as cards.
- Each card shows the algorithm name, a short description, and its difficulty level (🟢 Easy / 🟡 Medium / 🔴 Hard).
- Students select an algorithm and set the input (e.g., "n = 5"), then click **▶ Run Visualization**.
- The language switcher (EN / عر / עב) is available at the top right of both screens.

### Visualization Screen
After clicking Run, the student lands on the Visualization Screen. This is where all the learning panels live. The screen is divided into resizable columns — students can drag the dividers to make any panel larger or smaller.

---

## 3. Algorithm Categories

### Recursion

Five classic recursive algorithms, each increasing in conceptual depth:

| Algorithm | Description | Difficulty |
|-----------|-------------|------------|
| **Factorial** | Computes n! = n × (n−1) × … × 1. The simplest linear recursion. | 🟢 Easy |
| **Power** | Raises a base to an exponent using recursion: `Power(base, exp)` | 🟢 Easy |
| **Fibonacci** | Computes F(n) using two recursive calls — introduces branching recursion and the concept of repeated computation. | 🟡 Medium |
| **Sum Array** | Sums all elements of an integer array recursively. | 🟡 Medium |
| **Max Item** | Finds the largest element in an integer array recursively. | 🟡 Medium |

**Suggested progression:** Start with Factorial, move to Power, then Fibonacci (a great discussion starter about why it calls itself twice), then the array variants.

---

### Sorting

Three sorting algorithms that collectively illustrate different strategies:

| Algorithm | Description | Difficulty |
|-----------|-------------|------------|
| **Bubble Sort** | Repeatedly compares neighboring elements and swaps them if out of order. Easy to see "bubbling" the largest element to the end. | 🟢 Easy |
| **Selection Sort** | Finds the minimum element repeatedly and places it at the front. Clear in-place strategy. | 🟡 Medium |
| **Insertion Sort** | Builds the sorted portion one element at a time, inserting each new element into its correct position. | 🟡 Medium |

For sorting algorithms the Recursion Tree is replaced by a live **Array Visualizer** — color-coded tiles animate to show which elements are being compared and swapped.

---

### My Functions

Students (or teachers) can write and visualize their **own** recursive C# functions. See [Section 8](#8-adding-your-own-function) for full details.

---

## 4. The Visualization Panels

When running any algorithm, up to five panels appear on screen. They all stay synchronized — advancing one step updates every panel at once.

---

### Call Stack Panel

**What it shows:** The *live* state of the call stack — exactly which function calls are currently open (not yet returned), stacked from bottom (first call) to top (most recent call).

**How to read it:**
- Each frame shows the function name and its current parameter values (e.g., `Factorial(n=3)`).
- Frames are color-coded by depth — the first call is blue, the next is teal, then green, yellow, orange, and red for deeper levels.
- When a function returns, its frame disappears from the stack with a smooth animation.
- If a frame shows a **BASE CASE** label, the student is witnessing the stop condition of the recursion.

**Teaching use:** Ask students "how many frames are on the stack right now?" to build intuition about call depth and stack memory.

---

### Recursion Tree Panel

**What it shows:** A growing tree diagram of all function calls made so far, arranged so that every node's children are the recursive calls it made.

**How to read it:**
- Each circle (node) represents one function call with its input values.
- Lines between nodes show "this call triggered that child call."
- Nodes light up with their return value once the function returns.
- Base-case nodes are highlighted differently to clearly mark where the recursion stopped.

**Teaching use:** For Fibonacci, the tree clearly shows the *same sub-problem being computed multiple times* — a powerful visual for motivating memoization later in the course. For Factorial and Power, the tree is a straight line, reinforcing "linear recursion."

---

### Code Snippet Panel

**What it shows:** The full C# source code of the selected algorithm, with **live line highlighting** — the exact line being executed at the current step is highlighted in blue with a left border marker.

**How to use it:**
- The panel can be collapsed/expanded by clicking its header.
- Syntax highlighting colors keywords (purple), numbers (orange), strings (green), and comments (grey).
- As students step through the algorithm, the highlight moves within the code, connecting what they see in the tree to the actual code line.

**Teaching use:** Great for "I see the call on the tree — now which line of code produced it?" pair activities.

---

### Call Explanation / Narration Panel

**What it shows:** A plain-language sentence explaining what is happening at the current step. Every step type has its own style of explanation:

| Step Type | Example Narration |
|-----------|-------------------|
| **CALL** | *"Calling Factorial(n=3) at depth 1. It will call Factorial(n=2) next."* |
| **BASE CASE** | *"Base case reached! Factorial(n=1) returns 1 immediately — this is where the recursion stops."* |
| **RETURN** | *"Factorial(n=3) returns 6 (= 3 × 2)."* |
| **COMPARE** | *"Comparing positions 2 and 3: value 8 > value 1, so a swap will happen."* |
| **SWAP** | *"Swapping positions 2 and 3. Array is now [5, 3, 1, ...]."* |

A **"More ▼"** button expands the narration to show a deeper explanation of *why* this step happens.

**Teaching use:** Students can read the explanation aloud in class, or use "More" to self-check their understanding between steps.

---

### Array Visualizer (Sorting only)

**What it shows:** The array being sorted as a row of animated tiles. Each tile displays its value and a face emoji that changes to reflect its state:

| State | Emoji | Meaning |
|-------|-------|---------|
| Default | 🙂 | Element at rest |
| Comparing | 😮 | Element is being compared right now |
| Swapping | 😲 | Element is being swapped right now |
| Sorted | ✅ | Element has reached its final position |

A small text label below the tiles confirms the comparison result (e.g., "8 > 1 — will swap").

---

### Algorithm Insight Panel

**What it shows:** A collapsible side panel with:
- The **mathematical formula** of the algorithm (e.g., `F(n) = F(n-1) + F(n-2)`).
- A **description** of what the algorithm does conceptually.
- The current **time complexity** class (e.g., O(n), O(2ⁿ)).
- A live **computation chain** built step by step (e.g., `4! = 4 × 3 × 2 × 1`), or for Fibonacci, the sequence of computed values and a note about how many times each sub-problem was recalculated.

---

## 5. Playback Controls

The Control Bar sits at the bottom of the visualization screen and gives full control over stepping:

| Control | Action |
|---------|--------|
| **⏮ Reset** | Jump back to step 1 |
| **◀ Back** | Go one step backward |
| **▶ Play / ⏸ Pause** | Auto-play at the chosen speed |
| **▶ Next** | Go one step forward |
| **⏭ Skip to End** | Jump to the last step instantly |
| **Progress bar** | Click anywhere on the bar to jump directly to that step |
| **Speed selector** | Choose from 0.25×, 0.5×, 1×, 2×, or 4× playback speed |
| **Step counter** | Shows "Step 7 / 23" so students always know where they are |

---

## 6. Learn Mode vs Quiz Mode

### Learn Mode (default)
Students step through the algorithm freely, reading the narration and watching the panels update. No pressure — they can go forward and backward at will.

### Quiz Mode
Accessible via the **🎯 Quiz Mode** button in the header.

In Quiz Mode, before each step is revealed, students are shown a **multiple-choice question** asking them to predict what will happen next (e.g., "What does `Factorial(n=2)` return?"). After they answer:
- ✅ Correct answers show a green highlight with an explanation of *why* that's correct.
- ❌ Wrong answers show the correct choice and an explanation.

**XP & Combo System:**
- Each correct answer earns XP points.
- Getting 3 or more correct answers in a row shows a 🔥 combo multiplier.
- Reaching a combo of 5 unlocks the **"On Fire!"** achievement.

Students can exit Quiz Mode at any time and return to Learn Mode.

---

## 7. Achievements & Levels

Students earn **achievements** as they interact with the visualizer. Achievements are saved in their browser so progress persists across sessions.

| Achievement | How to Earn |
|-------------|-------------|
| 🛑 **First Base Case!** | Reach a BASE_CASE step in any algorithm |
| 🌀 **Fibonacci Conqueror** | Complete a full Fibonacci visualization |
| ↕️ **Sort Master** | Watch any sorting algorithm run to completion |
| 🔥 **On Fire!** | Get 5 correct quiz answers in a row |
| 💥 **Survived the Overflow** | View the stack-overflow disaster screen |

**Level system:** Unlocking achievements raises the student's level. The current level and level label are displayed on the home screen, giving a light sense of progression.

Whenever an achievement is newly unlocked, a **toast notification** pops up in the corner with the achievement title and icon.

---

## 8. Adding Your Own Function

The **My Functions** tab lets anyone add a custom recursive C# function to the visualizer. This is powerful for teachers who want to demonstrate their own examples, or for students who want to experiment.

### How to add a function

1. On the Home screen, click the **My Functions** tab.
2. Click the **➕ Add Your Function** card.
3. In the dialog that opens, paste or type a C# recursive function. The function must:
   - Return `int`, `long`, `double`, or `float`.
   - Accept only simple numeric parameters (`int`, `long`, `double`, `float`).
   - Include a base case (e.g., `if (n <= 1) return 1;`).
   - Call itself recursively.

**Example:**
```csharp
int Power(int base, int exp)
{
    if (exp == 0) return 1;
    return base * Power(base, exp - 1);
}
```

4. Click **Test** — the app will parse the function and run a quick trace. A green message confirms how many steps and calls were generated: `✅ Power(base=4, exp=4) — 10 steps, 5 calls, 5 returns. Ready to add!`
5. If there's an error, a message explains what went wrong (e.g., unsupported return type, missing base case).
6. Click **Add** to save the function.

### Managing custom functions

- Custom functions appear as cards in the **My Functions** tab just like built-in algorithms.
- Hover over a custom function card to see **Edit** and **Delete** buttons.
- The function is saved in the browser's local storage and persists across page reloads.

---

## 9. Import & Export Functions

Custom functions can be saved to a file and shared — useful if a teacher wants all students to have the same set of functions, or if a student wants to move their functions to a different browser or computer.

### Export

1. On the Home screen, click the **📥 Export Functions** button (visible when at least one custom function exists).
2. A JSON file named `recursiquest-functions-YYYY-MM-DD.json` is downloaded to the device.

### Import

1. Click the **📤 Import Functions** button.
2. Select a previously exported `.json` file.
3. The app imports all functions from the file and merges them with any existing custom functions. Duplicate IDs are replaced with the imported version.
4. Imported functions appear immediately in the **My Functions** tab.

**Teaching scenario:** A teacher prepares 3 custom functions, exports the file, and shares it with the class. Each student imports the file and instantly has all three functions ready to visualize.

---

## 10. Language Support

RecursiQuest supports three interface languages, switchable at any time with the language toggle in the top-right corner of both screens:

| Code | Language | Script Direction |
|------|----------|-----------------|
| **EN** | English | Left-to-right |
| **عر** | Arabic | Right-to-left (RTL) |
| **עב** | Hebrew | Right-to-left (RTL) |

Switching language updates **all text** in the interface — tabs, buttons, narrations, quiz questions, error messages, and all panel labels — instantly, without reloading the page. The layout automatically mirrors for RTL languages.

The code snippet panel always displays C# code left-to-right regardless of the selected language, as code is language-agnostic in direction.

---

## 11. Screenshot Feature

Each of the main panels — **Call Stack** and **Recursion Tree** — has a small 📷 **screenshot button** in its top-right corner. Clicking it saves a PNG image of that panel to the device's Downloads folder.

The file is named automatically, e.g., `callstack-factorial-step7.png` or `recursiontree-fibonacci-step12.png`.

**Teaching use:** Students can capture a snapshot of the recursion tree at its deepest point and include it in a homework report or present it in class.

---

## 12. Sharing a Specific Step

The **🔗 Copy Link** button in the control bar copies the current page URL — with the exact step number encoded — to the clipboard. Sharing that URL takes anyone directly to the same algorithm at the same step.

**Teaching use:** A teacher can navigate to a key moment (e.g., step 8 of Fibonacci where both branches are open), copy the link, and share it with the class so everyone starts at exactly that moment.

---

## 13. Keyboard Shortcuts

Students who prefer keyboard navigation can use the following shortcuts in the Visualization Screen:

| Key | Action |
|-----|--------|
| `→` (Right Arrow) | Next step |
| `←` (Left Arrow) | Previous step |
| `Space` | Play / Pause |
| `R` | Reset to beginning |

---

## 14. Quick-Start Checklist for Teachers

Use this checklist when introducing RecursiQuest to a class:

- [ ] Open the app and show the Home screen with the **three tabs**.
- [ ] Select **Factorial** (Easy), set `n = 4`, click **▶ Run Visualization**.
- [ ] Point out the **Call Stack** building up as you step forward.
- [ ] Point out the **Code Snippet** — watch the highlighted line move.
- [ ] Read the **Narration** aloud with the class for each step.
- [ ] At the base case, ask: *"Why does the recursion stop here?"*
- [ ] Use **Play** at 0.5× speed for a smooth demonstration.
- [ ] Switch to **Fibonacci(5)** — show how the **Recursion Tree** branches.
- [ ] Switch to **Bubble Sort** — introduce the **Array Visualizer**.
- [ ] Switch the language to **Arabic or Hebrew** to show RTL support.
- [ ] Demonstrate adding a **custom function** using a class example.
- [ ] Enable **Quiz Mode** and have students predict the next step.
- [ ] Show **Export** and explain how students can bring their work home.

---

*RecursiQuest — April 2026*
