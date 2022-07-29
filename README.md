# Refactoring code exercise.

The presented solution is cleaner because it generates the result in one single line using a fluent interface, this means that if you read the code from left to right, you will be able to understand what the function is doing internally.

So in order to achieve better code, I reduced the cyclomatic complexity to a max of 2 that means that every function should have a maximum of one if statement.

Instead the previous function had several if statement making it difficult to understand. 

Also the new functionality respects the single responsibility principle, which establish that a function should have only one reason to change.

Another approach I wanted to take, was with declaring simple functions and then apply a compose, but I did not know if we could install third party libraries like Ramda, so I went for a simple fluent interface.
