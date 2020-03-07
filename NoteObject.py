import mysql.connector#mysqldb connector

############################################################################################
#Class Note creates a connection to a local MySQL database
#Upon user input to create an account, constructor initializes a new table, or, if table (user)
#already exists, constructor continues, prints login statement.
#Designated to username within the database through its established connection.
#Class methods consist of functions addings to the database, as well as querying
#from the database in order to display user inputted data via post-it note-esque styling.
############################################################################################
class Note():
    def __init__(self, user):#establishes connection to database for entirety of class scope
        self.user = user
        mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="123password",
            database="testdb"
        )
        self.mydb = mydb#database connection
        self.cursor = mydb.cursor()#cursor class instance
        show = "SHOW TABLES LIKE %s"
        self.cursor.execute(show, (user,))
        result = self.cursor.fetchone()#if a user (table) exists
        if result:
            print("logging in")#display logging in, proceed to while loop
        else:
            print("Creating new account")
            self.cursor.execute(
                "CREATE TABLE {0} (category VARCHAR(255), note VARCHAR(255))".format(#create a new table in database
                    user))
    #Function displays note to user. Queries the database for every row.
    #Fetched tuples are cleaned to fit post-it note look
    #Appends tuples to a list, to display in order of entry
    def retrieveNote(self):#displays note to user
        select = "SELECT category, note FROM %s" % (self.user)#query
        self.cursor.execute(select)
        myresult = self.cursor.fetchall()#fetches from database
        displayList = []#empty list
       # print(myresult)
        for category, note in myresult:
            tempCategory = self.resizeNote(str(category))#'cleans' strings into correct size, resembling that of a post it note
            tempNote = self.resizeNote(str(note))
            printNote = ""#temp string constructor
            printNote += "____________________" + '\n'
            printNote += "| " + tempCategory + ":" + '\n'#reformatted
            printNote += "| " + tempNote + '\n'#reformatted
            printNote += "____________________"

            displayList.append(printNote)#appends per tuple recieved from myresult sql. Contains all the notes
        for i in displayList:
            print(i) #print to user
    #auxillary method used to format the inputted post it note to fit
    #post it note structure (in this case only 6 words per line)
    def resizeNote(self, string):
        counter = 0 #space character counter
        temp = ""#empty string
        string = string.split()
        for word in string:#intial sizing. At most 5 words on a line.
            counter = counter + 1
            if counter == 5:#5 word cap
                temp += "\n" + "| "
                temp += word + " "
                counter = 0
            else:
                temp += word + " "
        return temp#return refined temp
    #function prompts for user to input new post it note data
    #Inserts into database
    def newNote(self):#prompt for input, send input to database
        category = input("Category: ")
        entry = input("New note: ")
        try:
            self.cursor.execute("INSERT INTO {0} (category, note) VALUES (%s, %s)".format(self.user),#insert
                             (category, entry))  #notice(to self): sqldb connector seems to be weird with formats with quiery strings
                                                #if 3 variables were to be inserted, syntax would be difference from 2 variables
            self.mydb.commit()#commit changes
        except mysql.connector.Error as error:#except error thrown from mySQL
            print("error".format(error))

    #Method deletes current instance from table, and closes connection.
    def deleteAccount(self):
        self.cursor.execute("DROP TABLE {0}".format(self.user))#drop table from database (deleting user data)
        print("Account '" + self.user + "' has been deleted")
        self.cursor.close()#close connection
    #display menu for user
    def display(self):#display menu to user
        print("1. Display current notes")
        print("2. Enter a new note")
        print("3. Delete Category")
        print("4. Delete account")
        print("5. Log out")
    #method deletes notes via category description
    def deleteCategory(self, category):
        sql = "DELETE FROM {0} WHERE category = %s".format(self.user), (category,)
        print(sql)
        try:
            self.cursor.execute("DELETE FROM {0} WHERE category = %s".format(self.user), (category,))
            self.mydb.commit()
        except mysql.connector.Error as error:
            print("Error, no such category exists!")


#Main loop
user = input("Login (enter username (non case-sensitive): ")#standarding beginning login prompt
user = user.lower()
newNote = Note(user)#creates user instance
run = True
while run == True:#while true
    newNote.display()#display menu
    selection = int(input("Selection: "))
    if 1 <= selection <= 6:#if menu within range
        if selection == 1:#print post it notes
            newNote.retrieveNote()
        elif selection == 2:#new post it note
            newNote.newNote()
        elif selection == 3:#delete post it note(category)
            category = str(input("Category to delete: "))
            newNote.deleteCategory(category)
        elif selection == 4:#delete account
            prompt = input("Are you sure you want to delete this account? (y/n): ") #prompt to make sure user wants
            #to delete data
            prompt.lower()
            flag = True
            while flag == True:
                if prompt == 'y':
                    newNote.deleteAccount()#deletes account
                    while flag == True:
                        new = input("Log in to different account? (y/n): ")#prompt user to log into another account
                        new.lower()
                        if new == "y":
                            login = input("Enter username: ")
                            newNote = Note(login)#new class instance
                            flag = False
                        elif new == "n":#else, end program
                            print("Cya!")
                            flag = False
                            run = False
                        else:
                            print("Oops, don't know what that means!")
                elif prompt == 'n':#continue run loop
                    flag = False
                else:
                    print("Sorry, I didn't understand that! (y/n)?")

        elif selection == 5:#exit
            print("CYA!")
            break
    else:
        print("invalid entry, enter a choice (1-5)")


