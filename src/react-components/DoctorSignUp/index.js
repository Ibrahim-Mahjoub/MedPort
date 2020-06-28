import React from "react";
import { withRouter } from "react-router";

import "./styles.css";

// importing components
import DoctorSignUpForm from "./../DoctorSignUpForm";
import InstitutionSelector from "./../InstitutionSelector";
import InstitutionCreationForm from "./../InstitutionCreationForm";

// importing actions/required methods
import { addDoctor } from "../../actions/app";
import { redirect } from "../../actions/router";

// doctor signup component (controls the multi-step registration process)
class DoctorSignUp extends React.Component {
	
	// possible status values
	status = ['registration', 'select institution', 'create instituton'];
	
	constructor(props) {
		super(props);
		
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			MID: '',
			institutionID: '',
			statusIndex: 0,
			/* error: false,
			errorCode: '', */
		}
		
		// binding functions
		this.getSignUpForm = this.getSignUpForm.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.nextStatus = this.nextStatus.bind(this);
		this.previousStatus = this.previousStatus.bind(this);
		this.createDoctor = this.createDoctor.bind(this);
		this.setInstitutionID = this.setInstitutionID.bind(this);
		// this.setError = this.setError.bind(this);
		this.submit = this.submit.bind(this);
	}
	
	render() {
		
		return (
			<div className="DoctorSignUp">
				{/* this.state.error ? <h2>{this.state.errorCode}</h2> : null */}
				{this.getSignUpForm(this.state.statusIndex)}
			</div>
		);
	}
	
	// handles text input changes 
	handleInputChange = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;
		
		this.setState({
			[name]: value
		});
	}
	
	// allows InstitutionCreationForm to set the institutionID directly
	setInstitutionID(id) {
		
		this.setState({
			institutionID: id
		});
	}
	
	// returns the appropriate signup form based on the statusIndex
	getSignUpForm = (index) => {
		
		return {
			// doctor registration
			0: <DoctorSignUpForm 
					firstName={this.state.firstName}
					lastName={this.state.lastName}
					email={this.state.email}
					password={this.state.password}
					MID={this.state.MID}
					institutionID={this.state.institutionID}
					handleChange={this.handleInputChange}
					next={this.nextStatus}
			   />,
			// institution selection
			1: <InstitutionSelector 
					institutionID={this.institutionID}
					handleChange={this.handleInputChange}
					submit={this.submit}
					next={this.nextStatus}
					back={this.previousStatus}
			   />,
			// institution registration
			2: <InstitutionCreationForm
					setInstitutionID={this.setInstitutionID}
					appComponent={this.props.appComponent}
					back={this.previousStatus}
					submit={this.submit}
				/>,
		}[index];
	}
	
	// sets next statusIndex for next status value
	nextStatus() {
		const newIndex = (this.state.statusIndex + 1) % 3;
		this.setState({
			statusIndex: newIndex
		});
	}
	
	// sets statusIndex to the previous value, unless zero
	previousStatus() {
		if (this.state.statusIndex) {
			const newIndex = this.state.statusIndex - 1;
			this.setState({
				statusIndex: newIndex
			});
		}
	}
	
	createDoctor = () => {
		return({
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			password: this.state.password,
			MID: this.state.MID,
			institutionID: this.state.institutionID,
		});
	}
	
	// submit new doctor information
	submit() {
		const success = addDoctor(this.createDoctor());
		// navigate back to login page
		redirect(this, '/');
		
		/* if (success) {
			redirect(this, '/');
		} else {
			this.setError(true, 'Submission error, please try again.');
		}
		*/
	}
	
	// general error code handler
	/* setError(value, code) {
		this.setState({
			error: value,
			errorCode: code
		});
	} */
}

export default withRouter(DoctorSignUp);