import fs from 'fs';

export default function readFile(fileName){
	return new Promise((resolve, reject) => {
		fs.readFile(fileName, 'utf8', (err, contents)=>{
			if (err) throw new Error(err);
			resolve(contents);
		})
	})
}