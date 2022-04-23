function MenuSection() {
	return (
			<nav className="navbar navbar-inverse">
			<div className="container-fluid">
				<div className="navbar-header">
					<a className="navbar-brand" href="#">UTAIR</a>
				</div>
				<ul className="nav navbar-nav">
					<li className="active"><a href="#">Home</a></li>
					<li className="dropdown"><a className="dropdown-toggle"
						data-toggle="dropdown" href="#">Today <span className="caret"></span></a>
						<ul className="dropdown-menu">
							<li><a href="#">All</a></li>
							<li><a href="#">Arrival</a></li>
							<li><a href="#">Departure</a></li>
						</ul></li>
					<li><a href="#">Book</a></li>
				</ul>
				<ul className="nav navbar-nav navbar-right">
					<li><a href="#"><span className="glyphicon glyphicon-user"></span>
							Sign Up</a></li>
					<li><a href="#"><span className="glyphicon glyphicon-log-in"></span>
							Login</a></li>
				</ul>
			</div>
		</nav>
	);
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

    handleRegister(event, dest) {
    	event.preventDefault();
        ReactDOM.render(<RegisterationInformation destination={dest}/>, document.getElementById('app'));
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
					<a className="signup" href="#" onClick={(e) => this.handleRegister(e, this.props.destination)}>Buy</a>
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