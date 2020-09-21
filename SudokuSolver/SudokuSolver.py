#Creator: Chris Sauer
#SUDOKU SOLVER


# SOLVER FILE
import SudokuCore as Core
import sys
import os


#Description: Function opens a file supplied by the commandline, and checks if the file is found,
#if the file is formatted correctly, and if the data (hints) are placed in value locations, and indexes. 
#Pre-Condition: File must be supplied from user in command line
#Post-Condition: Returns a partial grid from the data in the file, or FALSE if any part of the file/data was not valid.
def createGridFromFile():
    startingDigits = 0
    count = 0
    grid = [[None]*9 for i in range(9)]
    
    #Initialize board with empty spaces to be filled in later.
    filename = sys.argv[1:]
    filename = "".join(filename)
    
    #ERROR HANDLE: Check if file exists and if empty
    
    try:    
        f = open(filename, "r")
        file_size = os.stat(filename).st_size  
        if(file_size == 0):
            print("File is empty: " + filename)
            return False, startingDigits
    except IOError:
        print("File is not found: " + filename)       
        return False, startingDigits
    #ERROR HANDLE: Check if file has invalid data
    with f:
        for line in f:
            count+=1
            line = line.split()
            line = [int(x) for x in line]# in case, integers assumed
            row, col, value = line
            if (row < 0 or row > 8) or (col < 0 or col > 8):
                print("Invalid row/col indexing on line",count,"of file.",row, col, "are not valid indexes.")
                return False, startingDigits
            if value > 9 or value < 1:
                print("Invalid data on line", count,str(value),"is not a valid entry")
                print("Halting program")
                return False, startingDigits
            grid[row][col] = value
            startingDigits+=1
            
    if checkValidInputData(grid) == False:
        print("Puzzle hints not placed in valid locations!")
        return False, startingDigits
    
    return grid, startingDigits



#Description: Helper function for createGridFromFile. Checks if the hints follow correct sudoku rules.
#Pre-Condition: Grid must be supplied 
#Post-Condition: Returns True if data is valid, false otherwise. 
def checkValidInputData(grid):
    for row in range(0, 9):
        for col in range(0, 9):
            if grid[row][col] != None:
                if(Core.checkValid(row, col, grid[row][col], grid)) == True:#if the number appears in any other row, column or square, (invalid) then exit program
                    return False
    return True


#Description: Function takes in all the data required for file output, and formats them to a file. 
#Pre-Condition: Requires calculateSolutions to be run with the grid supplied. That functon also handles the values of the metric variables.
#Post-Condition: Formats a file for data for the puzzle inputted. 
def writeToFile(grid, solutions, startingDigits, subgridEvals, comparisons, backtracks, iterations):

    outputFile = input("Enter a filename to output to: ")
    out = open(outputFile, "w")
    if grid:
        out.write("Puzzle solved successfully")
        out.write("\n")
        out.write("Statistics: ")
        out.write("\n")
        out.write("Number of Solutions: " + str(solutions))
        out.write("\n")      
        out.write("Number of Comparisons: " + str(comparisons))
        out.write("\n")
        out.write("Number of Backtracks: " + str(backtracks))
        out.write("\n")
        out.write("Number of Iterations " +  str(iterations))
        out.write("\n")
        out.write("Hints: " + str(startingDigits))
        out.write("\n")
        out.write("Subgrid Evaluations: " + str(subgridEvals))
        out.write("\n")
        for row in range(0, 9):
            if row%3 == 0:
                out.write("- - - - - - - - - - - - - ")
                out.write("\n")
            for col in range(0, 9):
                if col%3== 0:
                    out.write("| ")
                out.write(str(grid[row][col]))
                out.write(" ")
            out.write("|" + "\n")
        out.write("- - - - - - - - - - - - -")
    else:
        out.write("Puzzle cannot be solved!")
    out.close()
    return
    


def main():

    grid, startingDigits = createGridFromFile()
    mode = 0
    if startingDigits <= 17:
        mode = 0
    else:
        mode = 1
    if grid:
        solutions = Core.calculateSolutions(grid, mode)
        grid = Core.getSolutionGrid()#retrieve board
        Core.printGrid(grid)
    solutions, subgridEvals, comparions, backtracks, iterations = Core.getMetrics()#retrueve metrics data
    writeToFile(grid, solutions, startingDigits, subgridEvals, comparions, backtracks, iterations)#print to board
    Core.reset()#reset globals
    
main()








































