document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.getElementById("dropdown"); // Corrected the typo "dropwown" to "dropdown"
    const result = document.querySelector(".table"); // Changed getElementsByClassName to querySelector to get a single element
// console.log(dropdown.value);
    dropdown.addEventListener('change', () => {
        const selectedValue = dropdown.value;
        console.log(selectedValue)
        fetch(`/getData?selectedValue=${selectedValue}`) // Removed the space before "="
            .then((response) => response.json())
            .then((info) => {
                let tr = '';
                info.forEach((e,id) => {
                    tr += `<tr>
                        <td>${id+1}</td>
                        <td>${e.cat_id.name}</td>
                        <td>${e.name}</td>
                        <td><a href="/showsubcat/${e._id}" class="bg-primary p-2"
                        style="--bs-bg-opacity: .5;">Edit</a> <a href="/deletesubcat/${e._id}"
                        class="bg-danger p-2" style="--bs-bg-opacity: .5;">Delete</a> </td>
                    </tr>`;
                });
                result.innerHTML = tr;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
    const searchtext = document.getElementById("search"); // Corrected the typo "dropwown" to "dropdown"
// console.log(dropdown.value);
    searchtext.addEventListener('keyup', () => {
        const selectedValue = searchtext.value;
        // console.log(selectedValue)
        fetch(`/getFilteredData?selectedValue=${selectedValue}`) // Removed the space before "="
            .then((response) => response.json())
            .then((info) => {
                let tr = '';
                info.forEach((e,id) => {
                    tr += `<tr>
                        <td>${id+1}</td>
                        <td>${e.cat_id.name}</td>
                        <td>${e.name}</td>
                        <td><a href="/showsubcat/${e._id}" class="bg-primary p-2"
                        style="--bs-bg-opacity: .5;">Edit</a> <a href="/deletesubcat/${e._id}"
                        class="bg-danger p-2" style="--bs-bg-opacity: .5;">Delete</a> </td>
                    </tr>`;
                });
                result.innerHTML = tr;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
});
