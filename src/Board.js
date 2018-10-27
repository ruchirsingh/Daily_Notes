import React, { Component } from 'react'
import Note from './Note'
import FaPlus from 'react-icons/lib/fa/plus'

class Board extends Component {
	constructor(props) {
		super(props)
		this.state = {
			notes: []
		}
		this.currentNote = this.currentNote.bind(this)
		this.updateNote = this.updateNote.bind(this)
		this.removeNote = this.removeNote.bind(this)
		this.addNote = this.addNote.bind(this)
		this.nextNoteId = this.nextNoteId.bind(this)
	}

	componentWillMount() {
		var self = this
		if(this.props.count){
			fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
				.then(response => response.json())
					.then(json => json[0].split('. ').forEach(sentence => self.addNote(sentence.substring(0,25))))
		}
	}

	addNote(text) {
		this.setState(prevState => ({
			notes : [
				...prevState.notes,
				{
					id:this.nextNoteId(),
					note:text
				}
			]
		}))
	}

	nextNoteId() {
		this.uniqueId = this.uniqueId || 0
		return this.uniqueId++
	}

	updateNote(newText, i) {
		this.setState(prevState => ({
				notes : prevState.notes.map(
					note => (note.id !== i) ? note : {...note, note: newText}
				)
			})
		)
	}

	removeNote(id) {
		this.setState(prevState => ({
			notes : prevState.notes.filter(note => note.id !== id)
		}))
	}

	currentNote(note, i){
		return(
			<Note key={note.id}
				index={note.id}
				onChange={this.updateNote}
				onRemove={this.removeNote}>
				{note.note}
			</Note>
			)
	}

	render(){
		return(
			<div className="board">
				{this.state.notes.map(this.currentNote)}
				<button onClick={this.addNote.bind(null, "New Note")} id="add"><FaPlus /></button>
			</div>
		)
	}
}

export default Board