// helper function for input validation
function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 

// Code to solve puzzles in Vesper's Host
const max_single = 8;
const max_double = 32;
const max_target = 999;
const min_target = 10;

function p1(target)
{
    for (let a = max_single; a > 0; a--)
    {
        for (let b = a-1; b > 0; b--)
        {
            for (let c = b-1; c > 0; c--)
            {
                for (let d = c-1; d > 0; d--)
                {
                    if (a+b+c+d === target)
                    {
                        return  [a, b, c, d];
                    }
                }
            }
        }
    }
    return null;
}

function p2(target)
{
    for (let a = max_single; a > 0; a--)
    {
        for (let b = a-1; b > 0; b--)
        {
            for (let c = b-1; c > 0; c--)
            {
                for (let d = c-1; d > 0; d--)
                {
                    if (a*b*c*d == target)
                    {
                        return  [a, b, c, d];
                    }
                }
            }
        }
    }
    return null;
}

function p3(target)
{
    for (let a = max_double; a > 0; a--)
    {
        for (let b = a-1; b > 0; b--)
        {
            if (a*b == target)
            {
                let ans1 = p1(a);
                let ans2 = p1(b);
                if (ans1 !== null & ans2 !== null)
                {
                    return [ans1, ans2];
                }
            }
        }
    }
    return null;
}


const target_id = 'target_input_field';
const dropdown_id = 'puzzle_select_dropdown';
const result_id = 'result_output_field';
function solve()
{
    // get target value
    let input = document.getElementById(target_id).value;
    // error check
    if (!isNumber(input))
    {
        // output error message
        document.getElementById(result_id).innerHTML = "ERROR: Invalid input.";
        return;
    }
    // convert target value to number
    let target = Number(input);
    // check that number is within bounds
    if (target < min_target || target > max_target)
    {
        // output error message
        document.getElementById(result_id).innerHTML = "ERROR: please input a number between 10 and 999.";
        return;
    }
    
    // find calculus mode
    let encounterNum = document.getElementById(dropdown_id).value;
    
    // create a variable to store the ouput text in
    var output = "";
    // calculate solution
    // single set of results
    let result = null;
    if1: if (encounterNum == "1" || encounterNum == "2")
    {
        if (encounterNum == "1")
        {
            result = p1(target);
        }
        else
        {
            result = p2(target);
        }
        // handle invalid input
        if (!result)
        {
            output = "ERROR: Unable to solve (ensure target # is correct).";
            break if1;
        }
        // create output string
        for (let i = 0; i < result.length; i++)
        {
            output += result[i].toString();
            if (i != result.length-1)
            {
                output += " | ";
            }
        }
    }
    // nested array for two step third puzzle
    elif1: if (encounterNum == "3")
    {
        result = p3(target);
        
        // handle invalid input
        if (!result)
        {
            output = "ERROR: Unable to solve (ensure target # is correct).";
            break elif1;
        }
        for (let i = 0; i < result.length; i++)
        {
            let sum = 0;
            output += "Sequence " + (i+1) + ": ";
            for (let j = 0; j < result[i].length; j++)
            {
                sum += result[i][j];
                output += result[i][j].toString();
                if (j != result[i].length-1)
                {
                    output += " + ";
                }
                else
                {
                    output += " = " + sum;
                }
            }
            output += "<br/>";
        }
    }
    
    // send to html
    document.getElementById(result_id).innerHTML = output;
}

const image_display_id = 'image_display_field';
// swap image to appropriate puzzle
function swapImage()
{
    // get encounter number
    let encounterNum = document.getElementById(dropdown_id).value;
    
    // send to html
    document.getElementById(image_display_id).innerHTML = "<img src=\"img/vesper_puzzle_" + encounterNum + ".webp\" + alt=\"image of currently selected encounter\">";
    
}

// add event listener to init image
document.addEventListener("DOMContentLoaded", function() {
  swapImage();
});