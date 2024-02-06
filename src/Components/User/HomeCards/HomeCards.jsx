import React from 'react'

function HomeCards() {
    return (
        <div>
            <div class="container mx-auto mt-8">
                <p class="text-lg text-gray-600">
                    Discover amazing content and explore the best of our website. Start your journey today.
                </p>
            </div>
            <div class="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="bg-white shadow-lg rounded-lg overflow-hidden card transform transition-transform duration-200 hover:scale-105 hover:shadow-md">
                    <img
                        src="/src/assets/images/property1.jpg"
                        alt="Featured Content 1"
                        class="w-full h-50 object-cover"
                    />
                    <div class="border border-gray-300 p-2">
                        <p class="text-xl font-bold text-gray-800 mb-2">Guest House</p>
                    </div>
                    <h3 class="ml-2">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                     when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                      into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                       passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </h3>
                </div>
                <div class="bg-white shadow-lg rounded-lg overflow-hidden card transform transition-transform duration-200 hover:scale-105 hover:shadow-md">
                    <img
                        src="/src/assets/images/property2.jpg"
                        alt="Featured Content 2"
                        class="w-full h-50 object-cover"
                    />
                    <div class="border border-gray-300 p-3">
                        <p class="text-xl font-bold text-gray-800 mb-2">Open Houses</p>
                    </div>
                    <h3 class="ml-2">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                     when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                      into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                       passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </h3>
                </div>
                <div class="bg-white shadow-lg rounded-lg overflow-hidden card transform transition-transform duration-200 hover:scale-105 hover:shadow-md">
                    <img
                        src="/src/assets/images/property3.jpg"
                        alt="Featured Content 3"
                        class="w-full h-50 object-cover"
                    />
                    <div class="border border-gray-300 p-2">
                        <p class="text-xl font-bold text-gray-800 mb-2">New Construction</p>
                    </div>
                    <h3 class="ml-2">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                     when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                      into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                       passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </h3>
                </div>
            </div>
        </div>

    )
}

export default HomeCards
