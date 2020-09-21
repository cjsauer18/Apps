#Creator: Chris Sauer
#SUDOKU CORE MODULE


import copy
#GLOBAL METRICS
global COMPARISONS
global BACKTRACKS
global ITERATIONS
global SUBGRID_EVALUATIONS

#GLOBAL SOLVE TRACKERS
global SOLUTION_COUNT 
global GRID



#Description: Function evaluates whether the candidate number to be inserted into the grid is valid. Checks the local subgrid square, as well as 
#the rows and columns of the number in the grid. 
#Pre-Condition: Requires the grid, candidate nunmber, and corresponding row and column index to be passed in order to check.
#Post-Condition: Returns True if the candidate number satisfies the conditions of Sudoku, False otherwise.
def checkValid(row, col, number, grid):
    x = (row//3)*3
    y = (col//3)*3
    for i in range(0, 3):
        for j in range(0, 3):
            if grid[x+i][y+j] == number and (i,j) != (row, col):
                return False

    for x in range(0,9):
        if grid[row][x] == number:
            return False
    for y in range(0,9):
        if grid[y][col] == number:
            return False
    return True

#Description: Helper function evaluates whether a subgrid is complete. (filled in)
#Pre-Condition: Requires the grid at the current frame of calculateSolutions be supplied, and the index of the top row that marks the subgrid to
#be checked.
#Post-Condition: Returns true if subgrid is filled, False otherwise. 
def findSubPos(grid, r):
    for row in range(r-3, r):
        for col in range(0, 9):
            if grid[row][col] == None:#or some empty space marker
                return False     
    return True

#Description: Helper function checks if there are any open spaces in the grid
#Pre-Condition: Grid must be supplied.
#Post-Condition: Returns True if there are no open locations found on the grid. False otherwise
def findPos(grid):
    for row in range(0, 9):
        for col in range(0, 9):
            if grid[row][col] == None:#or some empty space marker
                return False   
    return True


#Description: Solve function takes a starting grid and a mode. Returns a count of how many solutions exist for a grid. Depending on mode (3 possible), 
#the function can display the iterative output of the completion of a subgrid. The mode shifts the function returns to indicate
#if a single solution exists, or if multiple exist.
#Pre-Condition: Requires a grid to be supplied, as well as a mode.
#Post-Condition: Assigns a global varaible to capture the state of the grid at the current stack frame where a solution was found. Depending on mode,
#an integer represnting how many solutions exist is returned. If mode == 1, 0-1, if mode == 2, 0 - 2, if mode == 2 , 0 - N (number of total possible solutions). 
def calculateSolutions(grid, mode):
    global GRID
    global COMPARISONS
    global BACKTRACKS
    global ITERATIONS
    global SOLUTION_COUNT
    global SUBGRID_EVALUATIONS
    ITERATIONS+=1
    if SOLUTION_COUNT >= 2 and mode == 1 or (mode == 0 and SOLUTION_COUNT == 1):
        return SOLUTION_COUNT
    for row in range(0, 9):
        for col in range(0, 9):
            if grid[row][col] == None:
                if row == 3 and SUBGRID_EVALUATIONS%2 == 0: #normally this would conditon the mode to be 0, so subgrids dont spam the console.
                    if findSubPos(grid, row):
                        print("Subgrid Complete! Cumulative Backtracks:", BACKTRACKS)
                        printGrid(grid)
                        SUBGRID_EVALUATIONS+=1
                if row == 6 and SUBGRID_EVALUATIONS%2 == 1:
                    if findSubPos(grid, row):
                        print("Subgrid Complete! Cumulative Backtracks:", BACKTRACKS)
                        printGrid(grid)
                        SUBGRID_EVALUATIONS +=1     
                for number in range(1, 10): 
                    COMPARISONS+=1
                    if checkValid(row, col, number, grid):
                        grid[row][col] = number
                        calculateSolutions(grid, mode)
                        BACKTRACKS+=1
                        grid[row][col] = None
                return SOLUTION_COUNT
    
    #allows us to capture the grid as it is complete in the current stack frame 
    SOLUTION_COUNT += 1
    SUBGRID_EVALUATIONS += 1
    if SOLUTION_COUNT == 1:
        GRID = copy.deepcopy(grid)#save first initial solution(if found)
    return SOLUTION_COUNT

#Description: Helper function prints a formatted grid to output. 
#Pre-Condition: Requires a grid be passed as argument.
#Post-Condition: Prints a formatted Sudoku style grid.
def printGrid(grid):
    for row in range(0, 9):#should be length of 9
        if row%3 == 0:
            print("- - - - - - - - - - - - -")
        for col in range(0, 9):
            if col%3== 0:
                print("|", end = " ")
            if(grid[row][col] == None):
                print(' ', end = " ")
            else:
                print(str(grid[row][col]), end = " ")
        print("|")
    print("- - - - - - - - - - - - -")
   
    


#Description: Utility function resets the global trackers and variables that are inplace around the calculateSolution function. 
#Pre-Condition: Depending on use case, this utility function be called before any calculateSolution instance, or sequence. Variation
#depends what is being measured. Relies on the mode input for calculateSolutions.
#Post-Condition: Resets global variable trackers places within recusive calculateSolutions function.
def reset():
    global GRID
    global SOLUTION_COUNT
    global SUBGRID_EVALUATIONS
    global COMPARISONS 
    global BACKTRACKS 
    global ITERATIONS
    SOLUTION_COUNT = 0
    GRID = [[None]*9 for i in range(9)]
    SUBGRID_EVALUATIONS = 0
    COMPARISONS = 0
    BACKTRACKS = 0
    ITERATIONS = 0
    
    
#Description: Getter function returns the grid that was copied from the current stack frame in calcualateSolutions that resulted
#in a completed sudoku grid. 
#Pre-Condition: Requires calculateSolutions to be called in order to provide valid data.  
#Post-Condition: Returns the grid of a solution if found, False if the grid was not complete.
def getSolutionGrid():
    global GRID
    if findPos(GRID) == False:
        return False #grid is not complete
    else:
        return GRID#solution found

 

#Description: Utility getter function. Returns the global metric variables. Records respective data within
#calculateSolutions.
#Pre-Condition: Requires calculateSolutions to be called to provide valid data. 
#Post-Condition: Returns solution count, subgrid evaluations, comparisons, backtracks, and iterations. 
def getMetrics():
    global SOLUTION_COUNT
    global SUBGRID_EVALUATIONS
    global COMPARISONS 
    global BACKTRACKS 
    global ITERATIONS
    return SOLUTION_COUNT, SUBGRID_EVALUATIONS, COMPARISONS, BACKTRACKS, ITERATIONS
    
reset()#standard init of global variables
