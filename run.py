from flask import Flask, render_template,url_for, request
app = Flask(__name__)

#import configuration from the app file
app.config.from_object('config')

@app.route('/chatrrbox')
def chatrrbox():
	return ''' Hello!' '''
	
	
	
@app.route('/',methods=['GET','POST'])
def home():
	error = None
	if request.method == 'post' or request.method == 'get':
		error = 'It is post'
		if request.form['loginname'] == 'jatin':
			return redirect(url_for('chatrrbox'))
		else:
			error = 'Sorry You are not Jatin'
	return render_template("home.html", error=error)	
	
	
if __name__ == '__main__':
	app.run(debug=True)
