# Particle Physics Simulator

### Matteo Golin

A very basic particle physics simulator I built after being inspired by the video made by [Brainxyz](https://www.youtube.com/watch?v=0Kx4Y9TVMGg).

### Features

The canvas allows the user to place particles in the space at any point during the simulation.

There is a `Clear` button to clear all particles from the space, as well as a `Random 3` button to place three particles in random locations on the space.

### Issues

I cannot seem to figure out the x and y coordinate mapping on the canvas element, so user clicks do not line up with particle placement.

There is no bounding box on the simulation so particles can float off the screen. Brainxyz implemented code to solve this problem by reversing the colliding particle's velocity on impact with the border, but this has not worked for me. I have chosen to leave out this code in order to remove all interference with particle motion.

### Technologies

- CSS
- HTML
- Javascript
