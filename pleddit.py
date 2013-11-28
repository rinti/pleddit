from flask import Flask, render_template, request
from werkzeug.contrib.fixers import ProxyFix

app = Flask(__name__)

app.wsgi_app = ProxyFix(app.wsgi_app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/r/<subreddit>/')
@app.route('/r/<subreddit>')
def redirect_subreddit(subreddit):
    return redirect('/#/%s' % subreddit, 303)

@app.route('/r/<subreddit>/<sorting>/')
@app.route('/r/<subreddit>/<sorting>')
def redirect_subreddit_sorting(subreddit, sorting):
    if request.args.get('t'):
        return redirect('/#/%s/%s/%s' % (subreddit, sorting, request.args.get('t')), 303)
    return redirect('/#/%s/%s' % (subreddit, sorting), 303)

@app.route('/user/<username>/m/<playlist>/')
@app.route('/user/<username>/m/<playlist>')
def redirect_multireddit(username, playlist):
    return redirect('/#/user/%s/m/%s' % (username, playlist), 303)

@app.route('/user/<username>/m/<playlist>/<sorting>/')
@app.route('/user/<username>/m/<playlist>/<sorting>')
def redirect_multireddit_sorting(username, playlist, sorting):
    if request.args.get('t'):
        return redirect('/#/user/%s/m/%s/%s/%s' % (username, playlist, sorting, request.args.get('t')), 303)
    return redirect('/#/user/%s/m/%s/%s' % (username, playlist, sorting), 303)

if __name__ == '__main__':
    app.run()