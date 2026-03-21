import { program } from 'commander';
import addUsers from './addUsers';
import removeUser from './removeUser';
import addMovies from './addMovies';
import removeMovie from './removeMovie';

program
	.description('pick your movie')
	.addCommand(addUsers)
	.addCommand(removeUser)
	.addCommand(addMovies)
	.addCommand(removeMovie)
	.parse();
