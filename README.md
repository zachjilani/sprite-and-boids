# Flocking Simulation
---

This program demonstrates boids flocking algorithm.
- How this algorithm works is that each boid follows three rules.
- 1. Coherence
Each boid flies towards the the other boids. But they don't just immediately fly directly at each other. They gradually steer towards each other.

- 2. Separation
Each boid also tries to avoid running into the other boids. If it gets too close to another boid it will steer away from it.

- 3. Alignment
Finally, each boid tries to match the vector (speed and direction) of the other boids around it.

---
## Sprite Interactivity
---

In this program, there will be a penguin guide. The penguin will move using the w, a, s, and d keys. While you aren't pressing keys, the boids will operate with the above rules. However you can press any key and they will flock to the penguin if they become close enough. 

---
## How to run:
---

Once you clone this repository, simply go into the file directory and run the line `python server.py` and open a web page to `localhost:3000` to see the program.

---
