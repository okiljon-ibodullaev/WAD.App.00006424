namespace TaskTrackerAPI_00006424.Repositories
{
  
    /// Generic repository interface defining basic CRUD operations.
    public interface IRepository<T>
    {
        
        /// Asynchronously creates a new entity in the repository.
        Task CreateAsync(T entity);
                
        /// Asynchronously updates an existing entity in the repository.
        Task UpdateAsync(T entity);

        /// Asynchronously deletes an entity from the repository by its unique identifier.
        Task DeleteAsync(int id);
               
        /// Asynchronously retrieves all entities from the repository.
        Task<IEnumerable<T>> GetAllAsync();

        /// Asynchronously retrieves a single entity by its unique identifier.
        Task<T> GetByIdAsync(int id);
    }
}
