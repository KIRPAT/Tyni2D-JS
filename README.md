# TODO
**Notes:** 
- The project will be in Vanilla JS. I believe no ES6 allowed, since the documentations they have sent are not showing classes.

### Scene Checklist:
- [x] Set up HTML-CSS-JS
- [x] Set up a basic canvas.

### Game Logic:
- [x] Game Objects
    - [x] Basic Object (root of all objects)
        - Write a function that takes following arguments...  
            - name: String --> Becomes the ID of HTML element.  
            - objectTypeClass: String --> Actor || Terrain
            - styleClasses: String Array --> Shape (CSS)
            - behaviorClasses: String Array --> Physics Object? Collision Active? 
            - Mass: Number --> Mass of the object.
        - ...and returns an object with following properties.
            - HTML string with inserted classes.
- [x] Ready up the scene mutator functions.
    - [ ] Injecting elements (actors, terrain).
        * To make them all subject to gravity, attach "physics-object" class tag.
        * Keep all physics objects in the.
### Game Loop:
- [x] A game loop that executes an array of functions.
    - [x] The loop should start working when the document is ready.  
- [x] Implement game time.
    - [x] Frame Time & Delta Time (Real Time)
        - Physics objects should be dependent to Delta Time.  
            - TODO: Take the global frame-rate constant (30 or 60) and divide 1000ms (1 sec) to it.
        - The game should be running in 30 or 60 FPS.
### Physics Checklist:
- [ ] Implement global physics.
    - [ ] Implement 
    - [ ] The collision should be limited to main canvas.
    - [ ] Physics should be affecting all the elements with "physics-object" class.  
