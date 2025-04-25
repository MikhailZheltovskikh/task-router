import { Component } from "react";

export default class ErrorBoundary extends Component {
	constructor(props) {
		super(props),
			(this.state = {
				hasError: false,
			});
	}

	static getDerivedStateFromError(error) {
		console.log(error.messege);

		return {
			hasError: true,
		};
	}

	componentDidCetch(error, errorInfo) {
		console.log('error:', error);
		console.log('errorInfo:', errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <h4>Что то пошло не так</h4>;
		}

		return this.props.children;
	}
}
