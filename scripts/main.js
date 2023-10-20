//#region REQUIRED VARIABLES

    //#region IDs
    var bingoMatrixBodyID = "bingo-matrix-body";
    var bingoMatrixTableID = "bingo-matrix-table"; 
    var bingoHeaderRowID = "bingo-header-row";
    var bingoHeaderCellID = "bingo-character-";                       
    var bingoCellID = "bingo-cell-";
    var bingoCalledOutNumbersID = "bingo-called-out-numbers"; 
    var bingoPopupMessageID = "bingo-popup-message";          
    var bingoSuccessMessageButtonID = "bingo-success-ok-button";
    //#endregion IDs

    //#region classes
    var bingoRowClass = "bingo-row";
    var bingoCellClass ="bingo-cell";
    var selectedClass = "selected";
    var hideContentClass = "hide-content"; 
    var bingoHeaderCellClass = "bingo-character";
    var bingoSuccessMessageClass = "bingo-success-message";
    var messageWrapperClass = "message-wrapper";

    var calculatingRowClass = "row-";
    var calculatingColumnClass = "column-";
    var calculatingDiagonalClass = "diagonal-"; 
    //#endregion Classes
            
    //#region lists
    var bingoCharacters = ["B","I","N","G","O"]
    var bingoNumberList = [ 1,2,3,4,5,
                            6,7,8,9,10,
                            11,12,13,14,15,
                            16,17,18,19,20,
                            21,22,23,24,25 ];
    //#endregion Lists

    //#region getting DOM Elements
    var bingoMatrixBody = document.getElementById(bingoMatrixBodyID);
    var bingoCalledOutNumbers = document.getElementById(bingoCalledOutNumbersID);
    var bingoPopMessageContainer = document.getElementById(bingoPopupMessageID);
    //#endregion getting DOM Elements

    //#region un-assigned variables
    var bingoMatrixTable;
    var bingoHeaderRow;
    var bingoHeaderCell;
    var bingoRow ;
    var bingoCell ;
    var bingoCharacterStrike;
    //#endregion un-assigned variables

    //#region game counts
    var BreakException = {};
    var totalBingoCount = 0;
    var keepAllCounts = {
        rows : {
            row1 : 0,
            row2 : 0,
            row3 : 0,
            row4 : 0,
            row5 : 0
        },
        columns : {
            column1 : 0,
            column2 : 0,
            column3 : 0,
            column4 : 0,
            column5 : 0,
        },
        diagonals : {
            diagonal1 : 0,
            diagonal2 : 0
        } 
    }
    //#endregion game counts
    
    //#region content and messages
var bingoSuccessMessageText = "Hurraayyy you won !! </br> Shout out BINGO !!";
var bingoSuccessMessageButtonText = "OK";
//#endregion messages

//#endregion REQUIRED VARIABLES

//#region REQUIRED FUNCTIONS

    //#region ResetFunctions
        //Update Bingo matrix on RESET button click
        function resetBingoNumbers(){
            //clear old number selections
            bingoCalledOutNumbers.innerHTML = '';
            //reset all counts
            resetAllCounts();
            //reset bingo character's selection
            resetAllBingoCharacters();
            //shuffle numbers
            var shuffledNumbers = shuffle(bingoNumberList);
            // updated the cells with the shuffled numbers
            var cell; 
            for(var i = 1; i<= bingoNumberList.length; i++){
                cell = document.getElementById(bingoCellID + i.toString());
                //remove selected class if present - as we are resetting the matrix
                if(cell.classList.contains(selectedClass)){
                    cell.classList.remove(selectedClass);
                }                                
                cell.innerHTML = shuffledNumbers[i-1];
            }
        }
        //Shuffle numbers from 1-25 in an array randomly
        function shuffle(numbers){
        var currentIndex = numbers.length,  randomIndex;
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [numbers[currentIndex], numbers[randomIndex]] = [
            numbers[randomIndex], numbers[currentIndex]];
        }
        return numbers;
    }
        //Set All counts to zero
        function resetAllCounts()             
        {
            //updating all counts to zero                
            for(var i = 1; i <= 5 ; i++)
                keepAllCounts.rows[ "row" + i.toString()] = 0;
            for(var i = 1; i <= 5 ; i++)
                keepAllCounts.columns[ "column" + i.toString()] = 0;
            for(var i = 1; i <= 5 ; i++)
                keepAllCounts.diagonals[ "diagonal" +i.toString()] = 0;
        }            
        //Unstrike all the BINGO characters based on counts
        function resetAllBingoCharacters(){
            totalBingoCount = 0;
            var bingoHeaderRow = document.getElementById(bingoHeaderRowID);
            if(bingoHeaderRow != null){
                bingoHeaderRow.childNodes.forEach(child => child.classList.remove(selectedClass));
            }
        }
    //#endregion ResetFunctions

    //#region NumberClickFunctions 
        //Clicked numbers updates
        function bingoNumberClick (element){                
            var clickedNumber = element.innerHTML;
            //if the number is un-selected
            if(element.classList.contains(selectedClass)){
                element.classList.remove(selectedClass);
                removeFromTallyBoard(clickedNumber);
                element.classList.forEach(elementclass => removeBingoCounts(elementclass));
            } 
            //else if the number is selected                   
            else{
                element.classList.add(selectedClass);
                addToTallyBoard(clickedNumber);
                element.classList.forEach(elementclass => addBingoCounts(elementclass));
                if(totalBingoCount >= 5)
                    winnerShoutOutBingo();    
            }                    
        }
        //Adding the bingo counters on number selection
        function addBingoCounts(elementclass){                                
            switch(elementclass)
            {
                //Cases to check Rows
                case calculatingRowClass+"1" :  
                                keepAllCounts.rows.row1++; 
                                if(keepAllCounts.rows.row1 == 5)                                            
                                    strikeBingoCharacters();                                    
                                break;
                case calculatingRowClass+"2" :  
                                keepAllCounts.rows.row2++;  
                                if(keepAllCounts.rows.row2 == 5)                                            
                                    strikeBingoCharacters();                                    
                                break;
                case calculatingRowClass+"3" :  
                                keepAllCounts.rows.row3++;  
                                if(keepAllCounts.rows.row3 == 5)                                            
                                    strikeBingoCharacters();                                    
                                break;
                case calculatingRowClass+"4" :  
                                keepAllCounts.rows.row4++;  
                                if(keepAllCounts.rows.row4 == 5)                                            
                                    strikeBingoCharacters();                                    
                                break;
                case calculatingRowClass+"5" :  
                                keepAllCounts.rows.row5++;  
                                if(keepAllCounts.rows.row5 == 5)                                            
                                    strikeBingoCharacters();                                    
                                break;
                //Cases to check Columns
                case calculatingColumnClass+"1" :   
                                    keepAllCounts.columns.column1++;
                                    if(keepAllCounts.columns.column1 == 5)                                            
                                        strikeBingoCharacters();  
                                    break;
                case calculatingColumnClass+"2" :   
                                    keepAllCounts.columns.column2++; 
                                    if(keepAllCounts.columns.column2 == 5)                                            
                                        strikeBingoCharacters();
                                    break;
                case calculatingColumnClass+"3" :   
                                    keepAllCounts.columns.column3++; 
                                    if(keepAllCounts.columns.column3 == 5)                                            
                                        strikeBingoCharacters();
                                    break;
                case calculatingColumnClass+"4" :   
                                    keepAllCounts.columns.column4++; 
                                    if(keepAllCounts.columns.column4 == 5)                                            
                                        strikeBingoCharacters();
                                    break;
                case calculatingColumnClass+"5" :   
                                    keepAllCounts.columns.column5++; 
                                    if(keepAllCounts.columns.column5 == 5)                                            
                                        strikeBingoCharacters();
                                    break;
                //Cases to check Diagonals
                case calculatingDiagonalClass+"1" : 
                                    keepAllCounts.diagonals.diagonal1++; 
                                    if(keepAllCounts.diagonals.diagonal1 == 5)                                            
                                        strikeBingoCharacters();
                                    break;
                case calculatingDiagonalClass+"2" : 
                                    keepAllCounts.diagonals.diagonal2++; 
                                    if(keepAllCounts.diagonals.diagonal2 == 5)                                            
                                        strikeBingoCharacters();
                                    break;
                default: /*TODO: can add some code for default*/break;
            }
        }
        //Removing the bingo counters when number is un-selected
        function removeBingoCounts(elementclass){                                
            switch(elementclass)
            {
                //Cases to check Rows
                case calculatingRowClass+"1" :  
                                if(keepAllCounts.rows.row1 == 5)                                            
                                    unstrikePreviousBingoCharacter();
                                keepAllCounts.rows.row1--;                                    
                                break;
                case calculatingRowClass+"2" :  
                                if(keepAllCounts.rows.row2 == 5)                                            
                                    unstrikePreviousBingoCharacter();
                                keepAllCounts.rows.row2--;                                    
                                break;
                case calculatingRowClass+"3" :  
                                if(keepAllCounts.rows.row3 == 5)                                            
                                    unstrikePreviousBingoCharacter();
                                keepAllCounts.rows.row3--;                                    
                                break;
                case calculatingRowClass+"4" :  
                                if(keepAllCounts.rows.row4 == 5)                                            
                                    unstrikePreviousBingoCharacter();
                                keepAllCounts.rows.row4--;                                    
                                break;
                case calculatingRowClass+"5" :  
                                if(keepAllCounts.rows.row5 == 5)                                            
                                    unstrikePreviousBingoCharacter();
                                keepAllCounts.rows.row5--;                                    
                                break;
                //Cases to check Columns
                case calculatingColumnClass+"1" :   
                                    if(keepAllCounts.columns.column1 == 5)                                            
                                        unstrikePreviousBingoCharacter();
                                    keepAllCounts.columns.column1--;                                    
                                    break;
                case calculatingColumnClass+"2" :   
                                    if(keepAllCounts.columns.column2 == 5)                                            
                                        unstrikePreviousBingoCharacter();
                                    keepAllCounts.columns.column2--;                                    
                                    break;
                case calculatingColumnClass+"3" :   
                                    if(keepAllCounts.columns.column3 == 5)                                            
                                        unstrikePreviousBingoCharacter();
                                    keepAllCounts.columns.column3--;                                    
                                    break;
                case calculatingColumnClass+"4" :   
                                    if(keepAllCounts.columns.column4 == 5)                                            
                                        unstrikePreviousBingoCharacter();
                                    keepAllCounts.columns.column4--;
                                    break;
                case calculatingColumnClass+"5" :   
                                    if(keepAllCounts.columns.column5 == 5)                                            
                                        unstrikePreviousBingoCharacter();
                                    keepAllCounts.columns.column5--;                                    
                                    break;
                //Cases to check Diagonals
                case calculatingDiagonalClass+"1" : 
                                    if(keepAllCounts.diagonals.diagonal1 == 5)                                            
                                        unstrikePreviousBingoCharacter();
                                    keepAllCounts.diagonals.diagonal1--;                                    
                                    break;
                case calculatingDiagonalClass+"2" : 
                                    if(keepAllCounts.diagonals.diagonal2 == 5)                                            
                                        unstrikePreviousBingoCharacter();
                                    keepAllCounts.diagonals.diagonal2--;                                    
                                    break;
                default: /*TODO: can add some code for default*/break;
            }
        }            
        //Strike out BINGO characters based on counts
        function strikeBingoCharacters(){
            totalBingoCount++;
            if(totalBingoCount <= 5){
                var bingoCharacterStrike = document.getElementById(bingoHeaderCellID + totalBingoCount);
                bingoCharacterStrike.classList.add(selectedClass);
            }                        
        }
        //Unstrike previous BINGO character based on bingoCount
        function unstrikePreviousBingoCharacter(){
            if(totalBingoCount <= 5){
                var bingoCharacterStrike = document.getElementById(bingoHeaderCellID + totalBingoCount);
                bingoCharacterStrike.classList.remove(selectedClass);
            }                        
            totalBingoCount--;
        }       
        //Add clicked number to tally board (sorted)
        function addToTallyBoard(clickedNumber){
            var bingoCalledOutNumberSpan = document.createElement("span"); 
            bingoCalledOutNumberSpan.id = "called-out-"+ clickedNumber;
            bingoCalledOutNumberSpan.innerHTML = clickedNumber;
            bingoCalledOutNumbers.appendChild(bingoCalledOutNumberSpan);
            for(var i = 0; i < bingoCalledOutNumbers.childElementCount ; i++){
                if(clickedNumber < parseInt(bingoCalledOutNumbers.children[i].innerHTML))
                {                                
                    bingoCalledOutNumbers.insertBefore(
                        bingoCalledOutNumberSpan,
                        bingoCalledOutNumbers.children[i]);
                    break;
                }
            }
        }
        //Remove clicked number from tally board
        function removeFromTallyBoard(clickedNumber){
            var removeNumberSpan = document.getElementById("called-out-"+clickedNumber);
                bingoCalledOutNumbers.removeChild(removeNumberSpan);
        }                
    //#endregion NumberClickFunctions 

    //#region PageInitialization
        //Creating initial Bingo matrix table
        function initalizeBingoMatrix(){
            //Bingo Table Element
            bingoMatrixTable = document.createElement("table");             
            bingoMatrixTable.id = bingoMatrixTableID;
            bingoMatrixTable.className = bingoMatrixTableID;
            //Bingo Header Row
            bingoHeaderRow = document.createElement("tr");
            bingoHeaderRow.id = bingoHeaderRowID;
            bingoHeaderRow.className = bingoHeaderRowID;                
            for(var i=1; i<=5 ; i++){
                bingoHeaderCell = document.createElement("th");
                bingoHeaderCell.id = bingoHeaderCellID + i;
                bingoHeaderCell.className = bingoHeaderCellClass;
                bingoHeaderCell.innerHTML = bingoCharacters[i-1];
                bingoHeaderRow.appendChild(bingoHeaderCell);
            }
            bingoMatrixTable.appendChild(bingoHeaderRow);
            //Bingo Rows and Cells                
            var numberCount = 1;
            for(var i = 1 ; i <= 5 ; i++){
                //each Row - new tr tag creation
                bingoRow = document.createElement("tr");
                bingoRow.className = bingoRowClass + i;                    
                for(var j = 1; j <= 5 ; j++){
                    //each cell - new td tag creation
                    bingoCell = document.createElement("td");
                    bingoCell.id = bingoCellID + numberCount;
                    //adding required classes for the cell
                    bingoCell.className = bingoCellClass;
                    bingoCell.classList.add(calculatingRowClass + i)
                    bingoCell.classList.add(calculatingColumnClass + j)
                    if( i== j)
                        bingoCell.classList.add(calculatingDiagonalClass + "1");
                    if( i + j == 6)
                        bingoCell.classList.add(calculatingDiagonalClass + "2");
                    //adding on-click attribute for the cell
                    bingoCell.setAttribute("onclick","bingoNumberClick(this)");
                    bingoCell.innerHTML = bingoNumberList[numberCount-1];
                    bingoRow.appendChild(bingoCell);
                    numberCount++;
                }
                //adding new row to the table
                bingoMatrixTable.appendChild(bingoRow);
            }

            //Once the complete table is ready
            bingoMatrixBody.appendChild(bingoMatrixTable);
        }  
        //On page-load activities
        window.onload = function(){
            //Generate bingo table using function
            initalizeBingoMatrix();   
        };
    //#endregion PageInitialization
    
    //#region PopupMessageFucntions
        //Showing winning message popup = shout-out BINGO
        function winnerShoutOutBingo(){
            //adding message wrapper div
            var messageWrapper = document.createElement("div");
                messageWrapper.className = messageWrapperClass;
            //adding message div
            var successMessage = document.createElement("div");
                successMessage.className = bingoSuccessMessageClass;
                successMessage.innerHTML = bingoSuccessMessageText;
            //adding message div button
            var successMessageButton = document.createElement("button");
                successMessageButton.id = bingoSuccessMessageButtonID;
                successMessageButton.className = bingoSuccessMessageButtonID;
                successMessageButton.setAttribute("onclick","closeSuccessMessage()");
                successMessageButton.innerHTML = bingoSuccessMessageButtonText;
            //adding message and button to wrapping container
            messageWrapper.appendChild(successMessage);
            messageWrapper.appendChild(successMessageButton);  
            //adding wrapped div to main popup-container
            bingoPopMessageContainer.appendChild(messageWrapper);
            
            //showing popup message
            bingoPopMessageContainer.classList.remove(hideContentClass);
        }
        //
        function closeSuccessMessage(){
    bingoPopMessageContainer.classList.add(hideContentClass);
    bingoPopMessageContainer.innerHTML = '';
}
    //#endregion PopupMessageFucntions

//#endregion REQUIRED FUNCTIONS   
