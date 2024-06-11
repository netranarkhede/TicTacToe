import tkinter as tk

root = tk.Tk()
root.title("Tic Tac Toe")

# Create variables to track the current player and the board state
current_player = "X"
board = [""] * 9

def check_win():
    for win_combination in [(0, 1, 2), (3, 4, 5), (6, 7, 8),
                            (0, 3, 6), (1, 4, 7), (2, 5, 8),
                            (0, 4, 8), (2, 4, 6)]:
        a, b, c = win_combination
        if board[a] == board[b] == board[c] != "":
            # canvas.create_line(a % 3 * 100, a // 3 * 100, c % 3 * 100, c // 3 * 100, fill="red", width=5)
            canvas.create_text(150, 150, text=f"Player {board[a]} wins!", font=("Arial", 16))
            return True
    return False

def click(event):
    global current_player
    x, y = event.x // 100, event.y // 100
    index = x + y * 3

    if board[index] == "":
        board[index] = current_player
        canvas.create_text(x * 100 + 50, y * 100 + 50, text=current_player, font=("Arial", 36), tags="move")
        current_player = "O" if current_player == "X" else "X"
        if not check_win() and all(cell != "" for cell in board):
            canvas.create_text(150, 150, text="It's a tie!", font=("Arial", 16))

canvas = tk.Canvas(root, width=300, height=300)
canvas.pack()

canvas.create_line(100, 0, 100, 300, fill="black", width=2)
canvas.create_line(200, 0, 200, 300, fill="black", width=2)
canvas.create_line(0, 100, 300, 100, fill="black", width=2)
canvas.create_line(0, 200, 300, 200, fill="black", width=2)

canvas.bind("<Button-1>", click)

root.mainloop()