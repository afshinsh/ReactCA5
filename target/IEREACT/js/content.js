function MenuSection() {
	return (
			<nav className="navbar navbar-inverse">
			<div className="container-fluid fixed-top">

				<div className="col-1">
					<button className="btn btn-lg btn-light" onClick={(e) => gotoMovies(e)}>Movies</button>
				</div>
				<div className="col-4">
					<ul className="nav navbar-nav" >
						<li className="active"><a href="http://localhost:8080/08_React_war_exploded/">Home</a></li>
					</ul>
				</div>
				<div className="col-5">
					<ul className="nav navbar-nav navbar-right" style={{display:'inline'}}>

						<li>
							<a>
								{localStorage.getItem('user')}</a></li>
						<li>
							<a onClick={handleSignup}>
								{getSignupText()}</a></li>
						<li>
							<a onClick={handleClick}><span className="glyphicon glyphicon-log-in"></span>
								{getText()}</a></li>
					</ul>
				</div>

			</div>
		</nav>
	);

	function handleSignup(){
		if(localStorage.getItem('user') == "")
			ReactDOM.render(<SignUp/>, document.getElementById('app'));
	}
	function handleClick(){
		if(localStorage.getItem('user') != "")
			Logout();
		else
			ReactDOM.render(<Login/>, document.getElementById('app'));

	}
	function getSignupText() {
		if(localStorage.getItem('user') == "")
			return "SignUp";
	}
	function getText(){
		if(localStorage.getItem('user') != "")
			return "Logout";
		else
			return "Login";
	}
	 function gotoMovies(event) {
		event.preventDefault();
		ReactDOM.render(<MoviesPage searchTerm="" searchType=""/>, document.getElementById('app'));
	}

}

class BodySection extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
    	return (
			<div className="container">
				<br/>
    			<div id="fdw-pricing-table">
					<SpecialOffer destination="Beijing" price="$59" food="Dinner and Breakfast"
						decoration="plan1" />
					<SpecialOffer destination="Toronto" price="$890" food="Breakfast, Lunch, and Dinner"
						decoration="plan2" popular="true" />
					<SpecialOffer destination="Barcelona" price="$275" food="Dinner and Breakfast" 
						decoration="plan3" />
					<SpecialOffer destination="Paris" price="$890" food="Breakfast and Lunch" 
						decoration="plan4" />
    			</div>
			</div>
        );
    }
}

class SpecialOffer extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.state = {available : 0};
    }

    handleRegister(event) {
    	event.preventDefault();
        ReactDOM.render(<MoviePage movieId={"1"} />, document.getElementById('app'));
    }
    
    render() {
    	return (
    			<div className={"plan " + this.props.decoration + (this.props.popular ? " popular-plan" : "")}>
					<div className="header">{this.props.destination}</div>
					<div className="price">{this.props.price}</div>
					<div className="monthly">Round Trip</div>
					<ul>
						<li>{this.props.food}</li>
						<li>{this.state.available}</li>
					</ul>
					<a className="sigup" href="#" onClick={(e) => this.handleRegister(e, this.props.destination)}>Buy</a>
				</div>
        );
    }

    fetchAvailable() {
    	fetch('getAvailableSeats/' + this.props.destination)
		  .then(resp => resp.json())
		  .then(data => this.setState(prevState => ({ available : data.available })));
    }
    componentDidMount() {
    	this.fetchAvailable();
    	this.timerId = setInterval(
    		() => {this.fetchAvailable()}
    		, 5000
    	);
    }


    componentWillUnmount() {
    	clearInterval(this.timerId);
    }   
}

class RegisterationInformation extends React.Component {
    constructor(props) {
        super(props);
        this.handleBooking = this.handleBooking.bind(this);
        this.handeSeatSelect = this.handeSeatSelect.bind(this);
        this.handeFirstName = this.handeFirstName.bind(this);
        this.handeLastName = this.handeLastName.bind(this);
        this.backToHome = this.backToHome.bind(this);
        this.state = {available : 0, firstName : '', lastName : '', numberOfTickets : 1};
    }

    handleBooking() {
    	event.preventDefault();
    	var params = {
		    "destination": this.props.destination,
		    "numberOfTickets" : this.state.numberOfTickets,
		    "firstName" : this.state.firstName,
		    "lastName" : this.state.lastName
        };
		var queryString = Object.keys(params).map(function(key) {
    		return key + '=' + params[key]
		}).join('&');
		const requestOptions = {
	        method: 'POST',
	        headers: { 
	        	'content-length' : queryString.length,
	        	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	        },
	        body: queryString
	    };
	    fetch('bookTheFlight', requestOptions)
	        .then(response => response.json())
	        .then(data => $("#infoModal").modal("show"));
    }

    handeSeatSelect(event) {
         this.setState(prevState => ({numberOfTickets: event.target.value}));
    }
    handeLastName(event) {
         this.setState(prevState => ({lastName: event.target.value}));
    }
    handeFirstName(event) {
         this.setState(prevState => ({firstName: event.target.value}));
    }
    backToHome(event) {
        ReactDOM.render(<BodySection />, document.getElementById('app'));
    }
    
    render() {
    	return (
			<div className="container">
    			<form onSubmit={this.handleBooking}>
    				<div className="form-group col-md-8">
    					<label for="exampleFormControlInput1">Destination</label>
    					<input type="text" readonly className="form-control" id="destination" value={this.props.destination}/>
    				</div>
    				<div className="form-group col-md-4">
    					<label for="exampleFormControlInput1">Available Seats</label>
    					<input type="text" readonly className="form-control" id="availableSeats" value={this.state.available}/>
    				</div>
    				<div className="form-row">
    					<div className="form-group col-md-6">
    						<label className="control-label" for="inputEmail4">First Name</label> 
    						<input type="text" className="form-control" id="firstName" id="inputEmail4" 
    							placeholder="First Name" onChange={this.handeFirstName}/>
				        	<span className="glyphicon glyphicon-remove form-control-feedback"></span>
    					</div>
    					<div className="form-group col-md-6">
    						<label className="control-label" for="inputEmail4">Last Name</label>
    						<input type="text" className="form-control" id="lastName" id="inputEmail4" 
    							placeholder="Last Name" onChange={this.handeLastName}/>
    				        	<span className="glyphicon glyphicon-remove form-control-feedback"></span>
    					</div>
    				</div>
    				<div className="form-group col-md-2">
    					<label className="control-label" for="exampleFormControlSelect1">Number Of Tickets</label> 
    					<select className="form-control" id="numberOfTickets" onChange={this.handeSeatSelect}>
    						<option>1</option>
    						<option>2</option>
    						<option>3</option>
    						<option>4</option>
    						<option>5</option>
    					</select>
    				</div>
    				<div className="col-md-12 text-center">
    					<button type="submit" className="btn btn-primary" id="doBook">Book</button>
    				</div>
    			</form>
				<div className="modal fade" id="infoModal" tabindex="-1" role="dialog">
				  <div className="modal-dialog" role="document">
				    <div className="modal-content">
				      <div className="modal-header">
				        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 className="modal-title">Booking Result</h4>
				      </div>
				      <div className="modal-body">
				        <p>{this.state.numberOfTickets} {this.state.numberOfTickets == 1 ? 'flight' : 'flights'} 
				        &nbsp;to {this.props.destination} {this.state.numberOfTickets == 1 ? 'is' : 'are'}
				        &nbsp;booked for {this.state.firstName} {this.state.lastName}.</p>
				      </div>
				      <div className="modal-footer">
				        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.backToHome}>Close</button>
				      </div>
				    </div>
				  </div>
				</div>
    		</div>
    	);
    }
    componentDidMount() {
    	fetch('getAvailableSeats/' + this.props.destination)
		  .then(resp => resp.json())
		  .then(data => this.setState(prevState => ({ available : data.available })));
    }
}

const temp = {id : 1, image : "temp", name: "temp"};
class WatchList extends React.Component{
	constructor(props) {
		super(props);
		this.removeWatchList = this.removeWatchList.bind(this);
		this.state = {movies : [], recMovies : [temp,temp,temp]}
	}

	removeWatchList(e, movie_id){
		fetch('RemoveWatchList/' + movie_id)
			.then(res => res.json())
			.then(data => this.setState(prevState => ({ movies : data.Data})));
	}

	render(){
		return (
			<div>
				{this.state.movies.map((movie) => (
					<div className="row justify-content-center align-items-center">
						<div className="row"
							 style={{borderRadius: "25px", width: "50%", marginTop: "2%", height: "200px", backgroundColor: "#797777"}}>
							<div className="col-3">
								<img src={movie.image} alt='' style={{marginLeft: "-9%", height: "100%"}}/>
							</div>
							<div className="col-4" style={{color: "white"}}>
								<h5 style={{margin: "2%"}}> {movie.name}</h5>
								<br/>
								<h6 style={{margin: "2%", textAlign: "right"}}> امتیاز کاربران : {movie.rating}</h6>
								<br/>
								<h6 style={{margin: "2%", textAlign: "right"}}> امتیاز imdb : {movie.imdbRate}</h6>
							</div>

							<div className="col-5" style={{color: "white"}}>
								<input type="image" src="images/trash.png"
									   style={{float: "right", marginTop: "1%"}} height="40" width="40" onClick={(e) => this.removeWatchList(e, movie.id)} />
								<br/>
								<br/>

								<h6 style={{margin: "2%", textAlign: "right"}}> کارگردان : {movie.director}</h6>
								<h6 style={{margin: "2%", textAlign: "right"}}>ژانر : {movie.concatGenres} </h6>
								<h6 style={{margin: "2%", textAlign: "right"}}> تاریخ انتشار : {movie.releaseDate} </h6>
								<h6 style={{margin: "2%", textAlign: "right"}}> مدت زمان : {movie.duration} </h6>

							</div>


						</div>


					</div>

				))}







			<div className="row justify-content-center align-items-center" style={{marginTop : "5%"}}>
				<div className="row" style={{borderRadius: "25px", width: "55%", marginTop: "3%"
					, height: "250px", backgroundColor: "rgb(79, 77, 77)", paddingLeft: "5%"}}>
					<div className="col-4" style={{marginTop: "4%"}} onClick={(e) => this.renderMoviePage(e, this.state.recMovies[0].id)}>
						<div className="fullwrap2">
							<img src={this.state.recMovies[0].image} alt='' style={{height: "80%"}} />
								<div className="fullcap2" >
									{this.state.recMovies[0].name}
								</div>
						</div>
					</div>
					<div className="col-4" style={{marginTop: "1%"}}>
						<h6 style={{color: "white", marginLeft: "3%"}}>فیلم های پیشنهادی</h6>

						<div className="fullwrap2" >
							<img  src={this.state.recMovies[1].image} alt='' style={{height: "73%"}} onClick={(e) => this.renderMoviePage(e, this.state.recMovies[1].id)}/>
								<div className="fullcap2">
									{this.state.recMovies[1].name}
								</div>
						</div>
					</div>
					<div className="col-4" style={{marginTop: "4%"}}>
						<div className="fullwrap2" >
							<img id="img" src={this.state.recMovies[2].image} alt='' style={{height: "80%"}} onClick={(e) => this.renderMoviePage(e, this.state.recMovies[2].id)}/>
								<div className="fullcap2">
									{this.state.recMovies[2].name}
								</div>
						</div>
					</div>
				</div>


			</div>



			</div>
		)
	}

	renderMoviePage(e, movie_id){
		ReactDOM.render(<MoviePage movieId={movie_id}/>, document.getElementById('app'));
	}
	componentDidMount(){
		fetch("GetWatchList")
			.then(resp => resp.json())
			.then(data => this.setState(prevState => ({ movies : data.Data})));

		fetch("GetRecommendedMovies")
			.then(resp => resp.json())
			.then(data => this.setState(prevState => ({ recMovies : data.Data})));
	}
}

class Actor extends React.Component{
	constructor(props) {
		super(props);
		this.state = {name : "", birthDate : "", nationality : "", image : "", listOfMovies : []}
	}

	render() {
		return (
		<div>

			<div className="photo">
				<img src={this.state.image}  width="100%" height="70%" alt='' />
			</div>


			<div className="details"  >

				<h3 style={{textAlign: "center", color : "white", fontWeight : "bold"}}>مشخصات بازیگر</h3>

				<div style={{marginRight:"7%"}}>
					<p style={{textAlign: "right", color : "white", fontWeight : "bold"}}>نام : {this.state.name} </p>
					<br/>

						<p style={{textAlign: "right", color : "white", fontWeight : "bold"}}> تاریخ تولد : {this.state.birthDate} </p>
						<br/>

							<p style={{textAlign: "right", color : "white", fontWeight : "bold"}}>ملیت : {this.state.nationality} </p>
							<br/>

								<p style={{textAlign: "right", color : "white", fontWeight : "bold"}}>تعداد فیلم ها : {this.state.listOfMovies.length} </p>
				</div>

				<div>
					<h3 style={{textAlign: "center", marginTop: "3%", color : "white"}}  > فیلم ها</h3>
					<div className='item-container'>
						{this.state.listOfMovies.map((movie) => (
							<div className='card' key={movie.id} onClick={(e) => this.renderMoviePage(movie.id)}>
								<div className="fullwrap">
									<img style={{height: "100%"}} src={movie.image}  alt='' />
									<div className="fullcap">
										{movie.name}<br/>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
		)
	}

	renderMoviePage(movie_id){
		ReactDOM.render(<MoviePage movieId={movie_id}/>, document.getElementById('app'));
	}
	componentDidMount() {
		fetch('GetActorDetails/' + this.props.actor_id)
			.then(resp => resp.json())
			.then(data => this.setState(prevState => ({ name : data.Data.name , birthDate : data.Data.birthDate
				, nationality : data.Data.nationality, image : data.Data.image})));

		fetch('GetActorMovies/' + this.props.actor_id)
			.then(resp => resp.json())
			.then(data => this.setState(prevState => ({ listOfMovies : data.Data})));
	}



}

class SignUp extends React.Component{
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div className="SignUp">
				<form >
					<label style={{color:"white"}}>Name : </label>
					<input
						type="text"
						style={{backgroundColor: "lightblue",margin: "20px"}}
					/>
					<br/>
					<label style={{color:"white"}}>NickName : </label>
					<input
						type="text"
						style={{backgroundColor: "lightblue",margin: "20px"}}
					/>
					<br/>

					<label style={{color:"white"}}>BirthDay : </label>
					<input
						type="text"
						style={{backgroundColor: "lightblue",margin: "20px"}}
					/>
					<br/>

					<label style={{color:"white"}}>Email : </label>
					<input
						type="text"
						style={{backgroundColor: "lightblue",margin: "20px"}}
					/>
					<br/>
					<label style={{color:"white"}}>Password : </label>
					<input
						type="text"
						style={{backgroundColor: "lightblue",margin: "20px"}}
					/>
					<button
						style={{margin: "20px", color:"white"}}
						type="submit">
						SignUp
					</button>
					<br/>

					<br/>
				</form>
			</div>
		)
	}

}

class Login extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderErrorMessage = this.renderErrorMessage.bind(this);
		this.setEmail = this.setEmail.bind(this);
		this.setPass = this.setPass.bind(this);
		this.renderLoginPage = this.renderLoginPage.bind(this);
		this.state = {valid: false, email: "", error: "", pass : ""};

	}

	setEmail(em) {
		this.state.email = em;
	}
	setPass(pa) {
		this.state.pass = pa;
	}


	handleSubmit(event) {
		event.preventDefault();
		this.fetchUser(this.state.email, this.state.pass);
	}

	renderLoginPage() {
		if (this.state.valid == true) {
			localStorage.setItem('user', this.state.email);
			ReactDOM.render(<MenuSection/>, document.getElementById('menu'));
			ReactDOM.render(<BodySection/>, document.getElementById('app'));

		} else {
			this.state.error = "کاربر یافت نشد!";
			ReactDOM.render(<Login/>, document.getElementById('app'));

		}

	}

	renderErrorMessage = () =>
		this.state.valid != false && (
			<div className="error">یافت نشد!</div>
		);

	render() {
		return (


			<div className="Login">
				<form onSubmit={this.handleSubmit}>
					<label style={{color:"white"}}>Email : </label>
					<input
						type="email"
						style={{backgroundColor: "lightblue",margin: "20px"}}

						onChange={(e) => this.setEmail(e.target.value)}
					/>
					<br/>
					<label style={{color:"white"}}>Password : </label>

					<input
						type="password"
						style={{backgroundColor: "lightblue",margin: "20px"}}
						onChange={(e) => this.setPass(e.target.value)}
					/>
					<button
						style={{margin: "20px", color:"white"}}
						type="submit">
						Login
					</button>
					<br/>

					<br/>
					<label id="error" style={{color:"white"}}>{this.state.error}</label>
				</form>
			</div>
		)
	}


	fetchUser(email, pass) {
		fetch('Login?email=' + email + '&&pass=' + pass)
			.then(resp => resp.json())
			.then(data => this.setState(prevState => ({ valid : data.valid })))
			.then(data => this.renderLoginPage());
	}
}


function Logout() {
	return (
		renders()
		);
	function renders(){
		fetch('Logout');
		localStorage.setItem('user', "");
		ReactDOM.render(<MenuSection/>, document.getElementById('menu'));
		ReactDOM.render(<BodySection/>, document.getElementById('app'));

	}
}


class MoviePage extends React.Component{
	constructor(props) {
		super(props);
		this.fetchMovieDetails = this.fetchMovieDetails.bind(this);
		this.state = {Id:1, name : '', summary : '', releaseDate : '', director : '', writers :[],
			genres:[], cast:[], imdbRate:0.0, rating:0.0, duration:1, ageLimit:18, comments:[],
			image:'',coverImage:'', commentText:'', temp:''};
	}

	render(){

		const stars =  []
		for (var i = 0; i < this.state.imdbRate; i++) {
			stars.push(<span className="fa fa-star checked" style={{color:'rgb(255, 205, 60)'}}></span>)
		}
		for (var i = 0; i < 10 - this.state.imdbRate; i++) {
			stars.push(<span className="fa fa-star"></span>)
		}

		const actors = []
		for (const [index, value] of this.state.cast.entries()) {
			actors.push(<div style={{display: 'flex', backgroundColor: '#4E4E50'}} className="card">
				<div className="image" onClick={(e) => this.gotoActor(value.ActorId)}
				><img className="card_img" src={value.Image} alt=""/>
					<i className="fa" id="actor_card">
						<p style={{fontSize:'medium'}}>{value.Name}</p>
						<p style={{fontSize:'medium'}}>{value.Age}</p>
					</i>
				</div>
			</div>)
		}
		const comments = []

		for (const [index, value] of this.state.comments.entries()) {
			comments.push(<div className="row justify-content-center align-items-center"
							   style={{backgroundColor: '#ffffff', borderRadius: '15px', margin: '5%'}}>
					<div className="col-2">
						<div className="row">
							<div className="col" style={{textAlign: 'center'}}>
								<button className="dislike" onClick={(e) => this.voteComment(value.movieId, value.Id, -1)}>
									<i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
								</button>
								<p>{value.dislike}</p>
							</div>
							<div className="col" style={{textAlign: 'center'}}>
								<button className="like" onClick={(e) => this.voteComment(value.movieId, value.Id, 1)}>
									<i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
								</button>
								<p>{value.like}</p>
							</div>
						</div>

					</div>
					<div dir="rtl" style={{float: 'right', textAlign:'right'}} className="col-10">
						<p style={{fontSize: 'larger'}}>{value.nickName}</p>
						<br/>
						<p style={{fontSize: 'medium'}}>{value.Text}</p>
					</div>
				</div>
			)
		}


		return(<div style={{backgroundColor: '#292929'}}>

			<div className="p-5 text-center bg-image" style={{backgroundImage:'url(\'' + this.state.coverImage + '\')',
				height:600, width: '100%'}}></div>

			<div className="row align-items-center" style={{marginTop : '-12%', marginLeft : '5%'}}>
				<div className="col-2">
					<div className="row justify-content-center align-items-center">
						<img width="200px" height="300px" src={this.state.image}/>
					</div>
					<div onClick={(e) => this.addToWatchList(movie.id)}
						className="row justify-content-center align-items-center" style={{textAlign:'center'}}>
						<a 	style={{width:'55%', marginTop:'5px', backgroundColor:'#B12025'}}
								className="btn-danger btn-lg">Add to WatchList</a>
					</div>
				</div>
				<div className="col-8">
					<div className="mask" dir="rtl"
						 style={{backgroundColor:'rgba(29, 29, 29, 0.5)', color: '#ffffff', marginLeft: '50px', fontSize:'160%'}}>
						<p>{this.state.name}</p>
						<p style={{textAlignLast: 'right'}}>کارگردان:   {this.state.director}</p>
						<p style={{textAlignLast: 'right'}}>نویسنده: {this.state.writers.toString()}</p>
						<p style={{textAlignLast: 'right'}}>مدت زمان:  {this.state.duration}</p>
						<p style={{textAlignLast: 'right'}}>تاریخ انتشار: {this.state.releaseDate}</p>
						<p style={{textAlignLast: 'right'}}>{this.state.summary}</p>
					</div>
				</div>
				<div className="col-2">
					<div className="rectangle">
						<div className="mask" style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
							<div className="d-flex justify-content-center align-items-center">
								<div className="text-white">
									<p style={{textAlign: 'center', fontSize: '400%', marginBottom: '25%'}}>{this.state.imdbRate}</p>
									{stars}
									<div className="row" dir="rtl">
										<div className="col-6">
											<p style={{fontSize:'medium'}}>امتیاز کاربران</p>
										</div>
										<div className="col-6">
											<p style={{fontSize:'x-large'}}>{this.state.rating}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>


			<div className="row justify-content-center align-items-center">
				<p style={{textAlign:'center', fontSize:'200%', color:'#ffffff'}}>بازیگران</p>
			</div>
			<div className="row justify-content-center align-items-center">
				<div style={{ display: 'flex', flexDirection:'row',textAlign: 'center', backgroundColor:'#4E4E50'}} className="scrolling-wrapper">
					{actors}
				</div>
			</div>
			<div className="container justify-content-center align-items-center" style={{backgroundColor: '#4E4E50'}}>
				<div className="row justify-content-center align-items-center" style={{margin:'2%', padding:'5%'}}>
					<p style={{textAlign:'center', fontSize:'200%', color:'#ffffff'}}>دیدگاه ها</p>
				</div>

				<div className="row justify-content-center align-items-center"
					 style={{backgroundColor:'#ffffff', borderRadius: '15px',marginLeft:'20%', marginRight:'20%'}}>
					<form action="#" method="POST">
						<label dir="rtl" style={{fontSize:'75%', color:'#ffffff', float:'right'}}>دیدگاه خود را اضافه کنید</label>
						<input type="text" className="form-control" placeholder="دیدگاه" aria-label="Username"
							   aria-describedby="basic-addon1" onChange={(e)=> this.setCommentText(e.target.value)}/>
						<button onClick={(e) => this.postComment(this.state.Id, this.state.commentText)} className="btn btn-success"type="submit">ثبت</button>
					</form>
				</div>
				{comments}
			</div>


		</div>);
	}
	addToWatchList(movieId){


		fetch('AddWatchList?movie_id='+movieId)
			.then(response => response.json()).then(data => this.setState(prevState => ({temp:'1'})));
	}
	setCommentText(text){
		this.state.commentText = text;
	}
	postComment(movieId, commentText){
		event.preventDefault();
		var params = {
			"movie_id": movieId,
			"commentText" : commentText
		};
		var queryString = Object.keys(params).map(function(key) {
			return key + '=' + params[key]
		}).join('&');
		const requestOptions = {
			method: 'POST',
			headers: {
				'content-length' : queryString.length,
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: queryString
		};
		fetch('addComment', requestOptions)
			.then(response => response.json()).then(data => this.setState(prevState => ({temp:'1'})));

	}
	fetchMovieDetails(){
		fetch('GetMovieById/' + this.props.movieId).then(resp => resp.json())
			.then(data => this.setState(prevState => ({name: data.Data.Name, summary: data.Data.Summary,
				releaseDate: data.Data.ReleaseDate, director : data.Data.Director, writers: data.Data.Writers,
				genres: data.Data.Genres, cast: data.Data.Cast, imdbRate: data.Data.ImdbRate, rating: data.Data.Rating,
				duration:data.Data.Duration, ageLimit: data.Data.AgeLimit, comments: data.Data.Comments,
				image: data.Data.Image, coverImage: data.Data.Cover})));
	}
	componentDidMount() {
		this.fetchMovieDetails();

	}
	voteComment(movieId, cmId, voteValue){
		event.preventDefault();
		var params = {
			"movie_id": movieId,
			"comment_id" : cmId,
			"voteValue" : voteValue
		};
		var queryString = Object.keys(params).map(function(key) {
			return key + '=' + params[key]
		}).join('&');
		const requestOptions = {
			method: 'POST',
			headers: {
				'content-length' : queryString.length,
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: queryString
		};
		fetch('voteComment', requestOptions)
			.then(response => response.json())

	}
	gotoActor(actorId){
		ReactDOM.render(<Actor actor_id={actorId}/>, document.getElementById('app'));
	}
}

class MoviesPage extends React.Component{
	constructor(props) {
		super(props);
		this.fetchMovies = this.fetchMovies.bind(this);
		this.state = {movies:[]};

	}

	render(){
		const movieCards = []
		for (const [index, value] of this.state.movies.entries()) {
			movieCards.push(<div className="row align-items-start">
				<div className="col">
					<img src={value.image}/>
				</div>
			</div>)
		}
		return (<div style={{backgroundColor: '#292929'}}>
				<div className="sidebar" style={{float:'right', textAlign: 'center', marginTop:'200px'}}>
					<a style={{backgroundColor:'#292929', color:'#ffffff'}}>:رتبه بندی بر اساس</a>
					<a href="#home" onClick={(e) => this.filterMovies("","","",1)}>تاریخ</a>
					<a href="#news"onClick={(e) => this.filterMovies("","","",-1)}>imdb امتیاز</a>
				</div>

				<div className="" style={{backgroundColor:'#292929', marginTop:'100px',width:'80%', margin:'5%'}}>
					<div className='item-container' style={{display:'flex', flexWrap:'wrap'}}>
						{this.state.movies.map((movie) => (
							<div onClick={(e) => this.gotoMoviePage(e, movie.id)}
								 style={{display: 'flex', backgroundColor: '#4E4E50'}} className="card">
								<div className="image"><img className="card_img" src={movie.image} alt=""/>
									<i className="fa" id="actor_card">
										<p style={{fontSize:'medium'}}>{movie.name}</p>
										<p style={{fontSize:'medium'}}>ImdbRate: {movie.imdbRate}</p>
									</i>
								</div>
							</div>
						))}
					</div>
				</div>

			</div>
		);
	}
	gotoMoviePage(event, movieId) {
		event.preventDefault();
		ReactDOM.render(<MoviePage movieId={movieId}/>, document.getElementById('app'));
	}

	fetchMovies(searchType, searchTerm){
		var params = {
			"searchTerm": this.props.searchTerm,
			"searchType" : this.props.searchType
		};
		var queryString = Object.keys(params).map(function(key) {
			return key + '=' + params[key]
		}).join('&');
		const requestOptions = {
			method: 'POST',
			headers: {
				'content-length' : queryString.length,
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: queryString
		};
		fetch('searchMovies', requestOptions)
			.then(response => response.json())
			.then(data => this.setState(prevState => ({movies:data})));

	}
	componentDidMount() {
		this.fetchMovies(this.props.searchType, this.props.searchTerm);

	}
	filterMovies(searchTerm, startDate,endDate, sortValue) {
		event.preventDefault();
		var params = {
			"searchTerm": searchTerm,
			"startDate" : startDate,
			"endDate" : endDate,
			"sortValue" : sortValue
		};
		var queryString = Object.keys(params).map(function(key) {
			return key + '=' + params[key]
		}).join('&');
		const requestOptions = {
			method: 'POST',
			headers: {
				'content-length' : queryString.length,
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: queryString
		};
		fetch('GetMoviesByFilter', requestOptions)
			.then(response => response.json())
			.then(data => this.setState(prevState => ({movies:data.Data})));
	}

}
