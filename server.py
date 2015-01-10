from flask import render_template
from flask import Flask
from flask.ext.assets import Environment, Bundle

app = Flask(__name__)

@app.route('/')
def hello(name=None):
    return render_template('poc.html', name=name)


if __name__ == '__main__':
    app.run(debug=True)