from tkinter import (
    Tk,
    PhotoImage,
    Label,
    Button,
    Frame,
    OptionMenu,
    StringVar,
    _setit
)
from os.path import dirname, join
from string import ascii_uppercase
from generate_random_phrase import generate_random_phrase


class Hangman:
    """Hangman Game MVP"""

    def __init__(self, root):
        """
            - Save references for hangman game-stage images
            - Initalize widgets, layout
            - Populate GUI with secret word/phrase
        """

        self.master = root
        self.master.title("Hangman")
        self.master.iconbitmap(f"{dirname(__file__)}/img/icon.ico")
        self.center_window()

        self.stages = []
        self.stages.append(PhotoImage(
            file=f"{dirname(__file__)}/img/0.gif",
            master=self.master
        ))
        self.stages.append(PhotoImage(
            file=f"{dirname(__file__)}/img/1.gif",
            master=self.master
        ))
        self.stages.append(PhotoImage(
            file=f"{dirname(__file__)}/img/2.gif",
            master=self.master
        ))
        self.stages.append(PhotoImage(
            file=f"{dirname(__file__)}/img/3.gif",
            master=self.master
        ))
        self.stages.append(PhotoImage(
            file=f"{dirname(__file__)}/img/4.gif",
            master=self.master
        ))
        self.stages.append(PhotoImage(
            file=f"{dirname(__file__)}/img/5.gif",
            master=self.master
        ))
        self.stages.append(PhotoImage(
            file=f"{dirname(__file__)}/img/6.gif",
            master=self.master
        ))

        # Widgets
        self.hangman = Label(self.master)
        self.current_guess = StringVar(self.master)
        self.current_guess.set("A")

        self.btn_frame = Frame(self.master)

        self.option_menu = OptionMenu(self.btn_frame, self.current_guess, "")
        self.option_menu.config(font=('calibri', 9), width=3)

        self.new_game_btn = Button(
            self.btn_frame, 
            text="New Game",
            command=self.new_game,
            width=20,
        )
        self.guess_btn = Button(
            self.btn_frame,
            text="Guess",
            width=10,
            command=lambda: self.guess(self.current_guess.get())
        )

        self.letter_frame = Frame(self.master)

        self.result_label = Label(self.master)

        # Layout
        self.master.columnconfigure(0, weight=1)
        self.hangman.grid(row=0, column=0)
        self.btn_frame.grid(row=1, column=0)
        self.new_game_btn.grid(row=0, column=1, columnspan=2, pady=10)
        self.guess_btn.grid(row=1, column=1, padx=2)
        self.option_menu.grid(row=1, column=2)
        self.letter_frame.grid(row=2, column=0, pady=20)
        self.result_label.grid(row=3, column=0)

        # Initalize
        self.new_game()

    
    def __str__(self):
        """Return address of self"""

        return f"Hangman GUI @ {hex(id(self))}"


    def new_game(self):
        """
            - Reset GUI & flags from previous round, fill optionmenu with a fresh alphabet
            - Populate self.secret and letter_frame with a new secret phrase, initalized
            to underscores (except for whitespace)
        """

        self.hangman.config(image=self.stages[0])
        self.result_label.config(text="")

        for widget in self.letter_frame.winfo_children():
            widget.destroy()

        self.stage = 0
        self.blanks = []
        self.game_over = False

        self.secret = generate_random_phrase(lower=1, upper=3)

        for i, letter in enumerate(self.secret):
            if letter == " ":
                letter_label = Label(self.letter_frame, text=" ")
                self.blanks.append(letter_label)
            else :
                letter_label = Label(self.letter_frame, text="_")
                self.blanks.append(letter_label)

            letter_label.config(font=('calibri', 15))
            letter_label.grid(row=0, column=i)
            

        self.option_menu["menu"].delete(0,"end")
        for char in ascii_uppercase: 
            self.option_menu["menu"].add_command(label=char, command=_setit(self.current_guess, char))
            self.current_guess.set("A") 


    def guess(self, guessed:str):
        """
            - Remove the guessed letter from the optionmenu
            - Increment the stage if the guess is incorrect, check if we're at last stage
            - If we reach final stage, game over & result_label set accordingly
            - Otherwise, reveal the guessed letter(s) in their respective label(s)
            - Finally, check if we reached the winning condition, in which no labels contain underscores
            - If so, game over & result_label set to "winner" message
        """

        if self.game_over:
            return
        
        indices = [i for i, x in enumerate(self.secret) if x == guessed]

        r_index=self.option_menu["menu"].index(guessed)
        self.option_menu["menu"].delete(r_index)
        self.current_guess.set(self.option_menu["menu"].entrycget(0,"label"))

        if not indices:
            self.stage += 1
            self.hangman.config(image=self.stages[self.stage])

        if self.stage >= 6:
            self.game_over = True
            self.result_label.config(text="Game Over.")
            return

        for i in indices:
            self.blanks[i].config(text=guessed)

        winner = True
        for widget in self.letter_frame.winfo_children():
            if (widget.cget("text") == "_"):
                winner = False

        if (winner):
            self.result_label.config(text="Winner!")
            self.game_over = True


    def center_window(self):
        self.master.geometry("600x600")
        self.master.update()
        (width_offset, height_offset)=self.get_offset(self.master)
        self.master.geometry(f"+{width_offset}+{height_offset}")


    @staticmethod
    def get_offset(tk_window):
        """
            Returns an appropriate offset for a given tkinter toplevel,
            such that it always is created center screen on the primary display.
        """

        width_offset = int(
            (tk_window.winfo_screenwidth() / 2) - (tk_window.winfo_width() / 2)
        )

        height_offset = int(
            (tk_window.winfo_screenheight() / 2) - (tk_window.winfo_height() / 2)
        )

        return (width_offset, height_offset)

    
def main():
    root = Tk()
    gui = Hangman(root)
    gui.master.mainloop()


if __name__ == "__main__":
    main()
