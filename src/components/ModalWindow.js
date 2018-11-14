import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export default class ModalWindow extends Component {
	state = {
		modalOpen: false
	}

	handleOpen = () => this.setState({ modalOpen: true })
	handleClose = () => this.setState({ modalOpen: false })

	render() {
		return (
			<Modal
				trigger={<Button onClick={this.handleOpen} primary>Description</Button>}
				open={this.state.modalOpen}
				onClose={this.handleClose}
				basic
				size='small'>
				<Header icon='browser' content={this.props.title} />
				<Modal.Content>
					{
						<div>
							<div>{this.props.overview}</div>
						</div>
					}
				</Modal.Content>
				<Modal.Actions>
					<Button color='green' onClick={this.handleClose} inverted>
						<Icon name='checkmark' /> Close
          </Button>
				</Modal.Actions>
			</Modal>
		)
	}
}
